import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/design-system/animations';
import Button from '@/components/Button';

interface WelcomeScreenProps {
  onChooseGuided: () => void;
  onChooseChat: () => void;
  isKidMode: boolean;
  onToggleKidMode: (isKid: boolean) => void;
}

export default function WelcomeScreen({
  onChooseGuided,
  onChooseChat,
  isKidMode,
  onToggleKidMode,
}: WelcomeScreenProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      className="flex flex-col items-center"
    >
      {/* Tagline */}
      <motion.p
        variants={fadeInUp}
        className="text-sm font-semibold text-coral-400 tracking-widest uppercase mb-4"
      >
        Every Kid Needs a Team
      </motion.p>

      {/* Title */}
      <motion.h1
        variants={fadeInUp}
        className="font-display text-5xl font-black text-warmblack-900 text-center mb-3"
      >
        {isKidMode ? 'Find Your Team! 🏆' : 'Find Your Team'}
      </motion.h1>
      <motion.p variants={fadeInUp} className="text-lg text-warmblack-400 text-center mb-8">
        {isKidMode
          ? "Let's find something awesome for you to do!"
          : "Let's find the perfect activity for your child."}
      </motion.p>

      {/* Who's browsing toggle */}
      <motion.div
        variants={fadeInUp}
        className="flex items-center bg-warmblack-50 rounded-full p-1.5 mb-10 w-full max-w-sm"
      >
        <button
          type="button"
          onClick={() => onToggleKidMode(false)}
          className={`
            flex-1 py-3 px-5 rounded-full text-base font-semibold transition-all cursor-pointer
            ${!isKidMode
              ? 'bg-white text-warmblack-800 shadow-sm'
              : 'text-warmblack-400 hover:text-warmblack-600'}
          `}
        >
          👋 I'm a Parent
        </button>
        <button
          type="button"
          onClick={() => onToggleKidMode(true)}
          className={`
            flex-1 py-3 px-5 rounded-full text-base font-semibold transition-all cursor-pointer
            ${isKidMode
              ? 'bg-white text-warmblack-800 shadow-sm'
              : 'text-warmblack-400 hover:text-warmblack-600'}
          `}
        >
          ⚡ I'm a Kid
        </button>
      </motion.div>

      {/* Mode cards */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Guided flow card */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-8 flex flex-col items-center text-center"
        >
          <div className="text-6xl mb-5">
            {isKidMode ? '🎯' : '✨'}
          </div>
          <h2 className="font-display font-bold text-xl text-warmblack-800 mb-2">
            {isKidMode ? 'Pick For Me!' : 'Help Me Choose'}
          </h2>
          <p className="text-sm text-warmblack-400 mb-6 leading-relaxed">
            {isKidMode
              ? 'Answer some fun questions and we\'ll find your match!'
              : 'Answer a few quick questions and we\'ll find the perfect match.'}
          </p>
          <Button variant="primary" size="lg" onClick={onChooseGuided} className="w-full">
            {isKidMode ? "Let's Go! 🚀" : "Let's Go"}
          </Button>
        </motion.div>

        {/* Chat flow card */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-8 flex flex-col items-center text-center"
        >
          <div className="text-6xl mb-5">
            {isKidMode ? '🤖' : '💬'}
          </div>
          <h2 className="font-display font-bold text-xl text-warmblack-800 mb-2">
            {isKidMode ? 'Chat With AI' : 'Chat With Us'}
          </h2>
          <p className="text-sm text-warmblack-400 mb-6 leading-relaxed">
            {isKidMode
              ? 'Tell us what you like and we\'ll figure it out together!'
              : 'Tell us about your kid and get personalized recommendations.'}
          </p>
          <Button variant="cta" size="lg" onClick={onChooseChat} className="w-full">
            {isKidMode ? 'Start Chat 💬' : 'Start Chatting'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
