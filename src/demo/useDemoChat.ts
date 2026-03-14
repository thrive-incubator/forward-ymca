import { useState, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import type { Program } from '@/data/types';
import { programs } from '@/data/programs';
import { createDemoChat, hasApiKey } from '@/demo/gemini-demo';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  programCards: Program[];
  quickReplies: string[];
  isStreaming: boolean;
}

const PROGRAM_CARD_REGEX = /\[PROGRAM_CARD:([a-z0-9-]+)\]/g;

function extractProgramCards(content: string): Program[] {
  const ids = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = PROGRAM_CARD_REGEX.exec(content)) !== null) {
    ids.add(match[1]);
  }
  return Array.from(ids)
    .map((id) => programs.find((p) => p.id === id))
    .filter((p): p is Program => p !== undefined);
}

function extractQuickReplies(content: string): string[] {
  const regex = /\[QUICK_REPLY:([^\]]+)\]/;
  const match = regex.exec(content);
  if (!match) return [];
  return match[1].split('|').map((s) => s.trim()).filter(Boolean);
}

function stripQuickReplyTokens(content: string): string {
  let stripped = content.replace(/\[QUICK_REPLY:[^\]]*\]/g, '');
  stripped = stripped.replace(/\[QUICK_REPLY:[^\]]*$/, '');
  return stripped.trimEnd();
}

function makeId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const GREETING_MESSAGE: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content:
    "Hey! 👋 Welcome to HereForward. I can help you find the perfect program for your kid here in San Diego.\n\nHow old is your kiddo?\n[BROWSE_LINK]",
  programCards: [],
  quickReplies: ['5-6 years', '7-8 years', '9-10 years', '11-12 years', '13+ years'],
  isStreaming: false,
};

const NO_API_KEY_MESSAGE: ChatMessage = {
  id: 'no-api-key',
  role: 'assistant',
  content:
    'AI chat is not configured. Please set the VITE_GEMINI_API_KEY environment variable and restart the dev server.',
  programCards: [],
  quickReplies: [],
  isStreaming: false,
};

export function useDemoChat() {
  const apiKeyAvailable = hasApiKey();
  const [messages, setMessages] = useState<ChatMessage[]>([
    apiKeyAvailable ? GREETING_MESSAGE : NO_API_KEY_MESSAGE,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!apiKeyAvailable || isLoading) return;

      if (!chatRef.current) {
        chatRef.current = createDemoChat();
        if (!chatRef.current) return;
      }

      // Clear quick replies on the previous assistant message
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 && m.role === 'assistant'
            ? { ...m, quickReplies: [] }
            : m,
        ),
      );

      const userMsg: ChatMessage = {
        id: makeId(),
        role: 'user',
        content: text,
        programCards: [],
        quickReplies: [],
        isStreaming: false,
      };

      const assistantId = makeId();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        programCards: [],
        quickReplies: [],
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);

      try {
        const response = await chatRef.current.sendMessageStream({
          message: text,
        });

        let fullContent = '';

        for await (const chunk of response) {
          const chunkText = chunk.text ?? '';
          fullContent += chunkText;
          const cards = extractProgramCards(fullContent);
          const displayContent = stripQuickReplyTokens(fullContent);

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: displayContent, programCards: cards }
                : m,
            ),
          );
        }

        const finalCards = extractProgramCards(fullContent);
        const finalQuickReplies = extractQuickReplies(fullContent);
        const finalDisplayContent = stripQuickReplyTokens(fullContent);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: finalDisplayContent,
                  programCards: finalCards,
                  quickReplies: finalQuickReplies,
                  isStreaming: false,
                }
              : m,
          ),
        );
      } catch (error) {
        console.error('Gemini chat error:', error);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Oops! Something went wrong 😅 Could you try that again?",
                  programCards: [],
                  quickReplies: [],
                  isStreaming: false,
                }
              : m,
          ),
        );
      } finally {
        setIsLoading(false);
      }
    },
    [apiKeyAvailable, isLoading],
  );

  return {
    messages,
    isLoading,
    sendMessage,
    hasApiKey: apiKeyAvailable,
  };
}
