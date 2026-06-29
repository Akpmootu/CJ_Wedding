import { motion } from 'framer-motion'
import { WEDDING } from '../config/wedding'

interface EnvelopeOverlayProps {
  onOpen: () => void
}

export function EnvelopeOverlay({ onOpen }: EnvelopeOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-cream"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        className="relative block w-full h-[100dvh] cursor-pointer border-none bg-transparent p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        whileTap={{ scale: 0.995 }}
        aria-label="เปิดซองการ์ดเชิญ"
      >
        <img
          src="/images/main-card.jpg"
          alt="การ์ดเชิญงานแต่งงาน Cherry & Jame"
          className="absolute inset-0 w-full h-full object-cover portrait:object-contain sm:object-contain sm:p-6"
        />

        <div className="absolute inset-x-0 top-0 pt-[max(1rem,env(safe-area-inset-top))] pb-16 bg-gradient-to-b from-cream/80 via-cream/30 to-transparent pointer-events-none">
          <p className="font-serif text-gold-muted text-xs tracking-[0.3em] text-center">
            {WEDDING.hashtag}
          </p>
        </div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute inset-x-0 bottom-0 pt-16 pb-[max(1.25rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-cream/90 via-cream/50 to-transparent pointer-events-none"
        >
          <p className="text-taupe text-sm text-center mb-1">เรียนเชิญเข้าร่วมงานฉลองมงคลสมรส</p>
          <p className="text-bronze text-xs tracking-wider text-center">(กดที่ซองจดหมาย)</p>
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
