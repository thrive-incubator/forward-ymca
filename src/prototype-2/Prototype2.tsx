import { useCallback, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { AgeRange, Program, Region } from '@/data/types';
import { programs } from '@/data/programs';
import { branches } from '@/data/branches';
import { matchPrograms } from '@/data/filters';
import HeroSection from '@/prototype-2/HeroSection';
import DataPointsSection from '@/prototype-2/DataPointsSection';
import QuickMatch from '@/prototype-2/QuickMatch';
import ProgramResults from '@/prototype-2/ProgramResults';
import SignupForm from '@/prototype-2/SignupForm';
import SignupConfirmation from '@/prototype-2/SignupConfirmation';
import QRCodeDisplay from '@/prototype-2/QRCodeDisplay';

export default function Prototype2() {
  // Flow state
  const [matchedPrograms, setMatchedPrograms] = useState<Program[]>([]);
  const [hasMatched, setHasMatched] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [signupData, setSignupData] = useState<{ childName: string } | null>(null);

  // Refs for scroll-to
  const quickMatchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLDivElement>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);

  function scrollTo(ref: RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // CTA click → scroll to quick match
  const handleCtaClick = useCallback(() => {
    scrollTo(quickMatchRef);
  }, []);

  // Quick match → filter programs and show results
  const handleMatch = useCallback((ageRange: AgeRange, region: Region) => {
    const regionBranchIds = branches
      .filter((b) => b.region === region)
      .map((b) => b.id);

    const matched = matchPrograms(programs, {
      ageRange,
      branchIds: regionBranchIds,
    });

    setMatchedPrograms(matched);
    setHasMatched(true);
    // Reset downstream state if re-matching
    setSelectedProgram(null);
    setSignupData(null);

    // Scroll to results after a short delay to let them render
    setTimeout(() => scrollTo(resultsRef), 200);
  }, []);

  // Sign Up click on a card → show signup form
  const handleSignUp = useCallback((program: Program) => {
    setSelectedProgram(program);
    setSignupData(null);
    setTimeout(() => scrollTo(signupRef), 200);
  }, []);

  // Form submit → show confirmation
  const handleFormSubmit = useCallback((data: { name: string; email: string; childName: string }) => {
    setSignupData({ childName: data.childName });
    setTimeout(() => scrollTo(confirmationRef), 200);
  }, []);

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Hero — full viewport */}
      <HeroSection onCtaClick={handleCtaClick} />

      {/* Data points — "Why This Matters" */}
      <DataPointsSection />

      {/* Quick Match */}
      <div ref={quickMatchRef}>
        <QuickMatch onMatch={handleMatch} />
      </div>

      {/* Results — only after match */}
      {hasMatched && (
        <div ref={resultsRef}>
          <ProgramResults programs={matchedPrograms} onSignUp={handleSignUp} />
        </div>
      )}

      {/* Signup Form — only after selecting a program */}
      {selectedProgram && !signupData && (
        <div ref={signupRef}>
          <SignupForm program={selectedProgram} onSubmit={handleFormSubmit} />
        </div>
      )}

      {/* Confirmation — only after form submit */}
      {selectedProgram && signupData && (
        <div ref={confirmationRef}>
          <SignupConfirmation program={selectedProgram} childName={signupData.childName} />
        </div>
      )}

      {/* QR Code */}
      <QRCodeDisplay />

      {/* Footer */}
      <footer className="py-8 bg-surface-200 text-center">
        <p className="text-sm text-warmblack-400">
          In partnership with{' '}
          <span className="font-semibold text-warmblack-500">YMCA of San Diego County</span>
        </p>
        <p className="mt-1 text-xs text-warmblack-300">
          Forward &mdash; Connecting every kid to a team
        </p>
      </footer>
    </div>
  );
}
