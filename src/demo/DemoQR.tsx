import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { Scan } from 'lucide-react';

const QR_SIZE = 256;
const CORNER = 28;

function CornerBracket({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = 'absolute border-coral-400';
  const style: Record<string, string> = {
    tl: 'top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-lg',
    tr: 'top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-lg',
    bl: 'bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-lg',
    br: 'bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-lg',
  };
  return (
    <motion.div
      className={`${base} ${style[pos]}`}
      style={{ width: CORNER, height: CORNER }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9 + (['tl','tr','bl','br'].indexOf(pos) * 0.07), duration: 0.25, type: 'spring' }}
    />
  );
}

export default function DemoQR() {
  const navigate = useNavigate();
  const demoUrl = `${window.location.origin}/demo`;
  const [scanning, setScanning] = useState(false);
  const [flashing, setFlashing] = useState(false);

  function handleSimulateScan() {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => setFlashing(true), 650);
    setTimeout(() => navigate('/demo'), 1050);
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center gap-0"
      style={{ background: 'linear-gradient(145deg, #1e1815 0%, #2B2521 45%, #4a1a0a 100%)' }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255, 107, 66, 0.10) 0%, transparent 70%)' }}
      />

      {/* Flash overlay */}
      {flashing && (
        <motion.div
          className="absolute inset-0 bg-white z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1] }}
          transition={{ duration: 0.38 }}
        />
      )}

      {/* Wordmark */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="text-5xl font-display font-black text-white tracking-tight leading-none">
          Here<span style={{ color: '#FF6B42' }}>Forward</span>
        </div>
        <div
          className="mt-2 text-sm font-body tracking-[0.22em] uppercase"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          Every Kid Needs a Team
        </div>
      </motion.div>

      {/* QR card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 180, damping: 18 }}
      >
        {/* Float */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Glow halo behind card */}
          <motion.div
            className="absolute inset-0 rounded-[28px] blur-2xl"
            style={{ background: 'rgba(255, 107, 66, 0.22)', transform: 'scale(1.12)' }}
            animate={scanning ? { opacity: [0.22, 0.7, 0.4] } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Card */}
          <div
            className="relative bg-white rounded-[28px] p-8"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,107,66,0.08)' }}
          >
            {/* Corner brackets */}
            <div className="absolute inset-5 pointer-events-none">
              <CornerBracket pos="tl" />
              <CornerBracket pos="tr" />
              <CornerBracket pos="bl" />
              <CornerBracket pos="br" />
            </div>

            {/* QR code + scan line */}
            <div className="relative overflow-hidden rounded-lg" style={{ width: QR_SIZE, height: QR_SIZE }}>
              <QRCodeSVG
                value={demoUrl}
                size={QR_SIZE}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#2B2521"
              />

              {/* Scan line */}
              <motion.div
                key={scanning ? 'fast' : 'idle'}
                className="absolute left-0 right-0 pointer-events-none"
                style={{ height: 3 }}
                initial={{ top: '0%', opacity: 1 }}
                animate={
                  scanning
                    ? { top: ['0%', '100%'], opacity: [1, 1, 0] }
                    : { top: ['0%', '100%', '0%'], opacity: 1 }
                }
                transition={
                  scanning
                    ? { duration: 0.55, ease: 'linear' }
                    : { duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.1 }
                }
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #FF6B42 20%, #FF8C6B 50%, #FF6B42 80%, transparent 100%)',
                  }}
                />
                {/* Soft glow trail */}
                <div
                  className="absolute inset-x-0 -top-3 h-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,107,66,0.18), transparent)' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Label */}
      <motion.p
        className="mt-7 text-base font-body"
        style={{ color: 'rgba(255,255,255,0.45)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        Scan to find your kid's team
      </motion.p>

      {/* Simulate Scan button */}
      <motion.button
        className="mt-5 flex items-center gap-2 text-white font-display font-bold text-base px-8 py-3.5 rounded-full"
        style={{
          background: scanning ? '#C4401F' : '#FF6B42',
          boxShadow: '0 4px 24px rgba(255,107,66,0.45)',
          cursor: scanning ? 'default' : 'pointer',
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.4 }}
        whileHover={scanning ? {} : { scale: 1.05, boxShadow: '0 6px 32px rgba(255,107,66,0.6)' }}
        whileTap={scanning ? {} : { scale: 0.96 }}
        onClick={handleSimulateScan}
      >
        <motion.span
          animate={scanning ? { rotate: 360 } : { rotate: 0 }}
          transition={scanning ? { duration: 0.5, ease: 'linear' } : {}}
        >
          <Scan size={18} />
        </motion.span>
        {scanning ? 'Scanning…' : 'Scan'}
      </motion.button>
    </div>
  );
}
