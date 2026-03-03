import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeDisplay() {
  const url = 'https://forward-ymca.web.app/prototype-2';

  return (
    <section className="py-16 md:py-20 bg-surface-100">
      <motion.div
        className="max-w-xs mx-auto px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        {/* QR card */}
        <div className="bg-white rounded-2xl shadow-elevated p-8 flex flex-col items-center">
          <QRCodeSVG
            value={url}
            size={180}
            level="M"
            bgColor="#FFFFFF"
            fgColor="#2B2521"
            includeMargin={false}
          />
          <p className="mt-4 text-sm font-semibold text-warmblack-600 text-center">
            Scan to find your team
          </p>
        </div>
      </motion.div>
    </section>
  );
}
