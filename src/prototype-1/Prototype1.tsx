import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Program } from '@/data/types';
import AnimatedPage from '@/components/AnimatedPage';
import WelcomeScreen from '@/prototype-1/WelcomeScreen';
import GuidedFlow from '@/prototype-1/guided/GuidedFlow';
import ChatFlow from '@/prototype-1/chat/ChatFlow';
import SignupConfirmation from '@/prototype-1/SignupConfirmation';

type FlowState = 'welcome' | 'guided' | 'chat' | 'confirmation';

export default function Prototype1() {
  const [flowState, setFlowState] = useState<FlowState>('welcome');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isKidMode, setIsKidMode] = useState(false);

  function handleSignUp(program: Program) {
    setSelectedProgram(program);
    setFlowState('confirmation');
  }

  function handleReset() {
    setSelectedProgram(null);
    setFlowState('welcome');
  }

  return (
    <AnimatedPage>
      <div className="max-w-xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {flowState === 'welcome' && (
            <WelcomeScreen
              key="welcome"
              onChooseGuided={() => setFlowState('guided')}
              onChooseChat={() => setFlowState('chat')}
              isKidMode={isKidMode}
              onToggleKidMode={setIsKidMode}
            />
          )}
          {flowState === 'guided' && (
            <GuidedFlow
              key="guided"
              onSignUp={handleSignUp}
              onBack={() => setFlowState('welcome')}
              isKidMode={isKidMode}
            />
          )}
          {flowState === 'chat' && (
            <ChatFlow
              key="chat"
              onSignUp={handleSignUp}
              onBack={() => setFlowState('welcome')}
            />
          )}
          {flowState === 'confirmation' && selectedProgram && (
            <SignupConfirmation
              key="confirmation"
              program={selectedProgram}
              onDone={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
}
