import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import type { Program } from '@/data/types';
import Button from '@/components/Button';

interface SignupFormProps {
  program: Program;
  onSubmit: (data: { name: string; email: string; childName: string }) => void;
}

export default function SignupForm({ program, onSubmit }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !childName.trim()) return;
    onSubmit({ name: name.trim(), email: email.trim(), childName: childName.trim() });
  }

  const inputClasses =
    'w-full rounded-lg border border-warmblack-200 px-4 py-3 text-warmblack-800 ' +
    'placeholder:text-warmblack-300 focus:outline-none focus:border-coral-500 focus:ring-2 ' +
    'focus:ring-coral-500/20 transition-colors bg-white text-sm';

  return (
    <section className="py-16 md:py-24 bg-surface-100">
      <motion.div
        className="max-w-md mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl font-display font-bold text-warmblack-800 text-center mb-2">
          Almost there!
        </h2>
        <p className="text-warmblack-400 text-center text-sm mb-8">
          Sign up for <span className="font-semibold text-warmblack-600">{program.name}</span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Your name */}
          <div>
            <label htmlFor="p2-name" className="block text-sm font-semibold text-warmblack-600 mb-1.5">
              Your name
            </label>
            <input
              id="p2-name"
              type="text"
              required
              placeholder="e.g. Maria Garcia"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="p2-email" className="block text-sm font-semibold text-warmblack-600 mb-1.5">
              Email
            </label>
            <input
              id="p2-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Child's first name */}
          <div>
            <label htmlFor="p2-child" className="block text-sm font-semibold text-warmblack-600 mb-1.5">
              Child&rsquo;s first name
            </label>
            <input
              id="p2-child"
              type="text"
              required
              placeholder="e.g. Sofia"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Submit */}
          <div className="mt-2">
            <Button variant="cta" size="lg" type="submit" className="w-full rounded-full">
              Join {program.name}
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
