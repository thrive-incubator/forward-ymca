import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import proto1md from '../../docs/prototype-1-onepager.md?raw';
import proto2md from '../../docs/prototype-2-onepager.md?raw';
import proto3md from '../../docs/prototype-3-onepager.md?raw';

const markdownByPrototype: Record<string, string> = {
  '/prototype-1': proto1md,
  '/prototype-2': proto2md,
  '/prototype-3': proto3md,
};

interface PrototypeInfoModalProps {
  prototypeKey: string | null;
  onClose: () => void;
}

export default function PrototypeInfoModal({ prototypeKey, onClose }: PrototypeInfoModalProps) {
  const content = prototypeKey ? markdownByPrototype[prototypeKey] : null;

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-warmblack-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-elevated p-6 sm:p-8"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-warmblack-400 hover:text-warmblack-700 hover:bg-surface-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="markdown-onepager">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-warmblack-900 mb-1">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-display text-lg sm:text-xl font-bold text-warmblack-800 mt-6 mb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-display text-base font-bold text-warmblack-700 mt-4 mb-1.5">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm leading-relaxed text-warmblack-500 mb-3">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-warmblack-700">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm leading-relaxed text-warmblack-500">{children}</li>
                  ),
                  hr: () => <hr className="my-4 border-surface-200" />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
