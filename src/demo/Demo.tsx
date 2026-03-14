import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Program } from '@/data/types';
import DemoWelcome from '@/demo/DemoWelcome';
import DemoChat from '@/demo/DemoChat';
import DemoGuided from '@/demo/DemoGuided';
import DemoSignup from '@/demo/DemoSignup';
import DemoConfirmation from '@/demo/DemoConfirmation';

type DemoState = 'welcome' | 'chat' | 'guided' | 'signup' | 'confirmation';

export default function Demo() {
  const [state, setState] = useState<DemoState>('welcome');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  function handleStart() {
    setState('chat');
  }

  function handleSwitchToGuided() {
    setState('guided');
  }

  function handleInterested(program: Program) {
    setSelectedProgram(program);
    setState('signup');
  }

  function handleSignupSubmit(_data: { name: string; phone: string }) {
    setState('confirmation');
  }

  function handleReset() {
    setSelectedProgram(null);
    setState('welcome');
  }

  return (
    <AnimatePresence mode="wait">
      {state === 'welcome' && (
        <motion.div key="welcome" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
          <DemoWelcome onStart={handleStart} />
        </motion.div>
      )}
      {state === 'chat' && (
        <DemoChat
          key="chat"
          onSignUp={handleInterested}
          onSwitchToGuided={handleSwitchToGuided}
        />
      )}
      {state === 'guided' && (
        <DemoGuided
          key="guided"
          onSignUp={handleInterested}
          onBack={() => setState('chat')}
        />
      )}
      {state === 'signup' && selectedProgram && (
        <DemoSignup key="signup" program={selectedProgram} onSubmit={handleSignupSubmit} />
      )}
      {state === 'confirmation' && selectedProgram && (
        <DemoConfirmation key="confirmation" program={selectedProgram} onReset={handleReset} />
      )}
    </AnimatePresence>
  );
}
