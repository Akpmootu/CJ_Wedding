import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Download, X } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'

export function SpecialGift() {
  const [isOpen, setIsOpen] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/images/pic/CJ_GiftWedding.jpg'
    link.download = 'CJ_GiftWedding.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="special-gift" className="section-padding bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="max-w-lg mx-auto text-center px-6"
      >
        <SectionHeader
          icon={Gift}
          title="Special Gift"
          subtitle="ร่วมแสดงความยินดีผ่านช่องทางออนไลน์"
        />

        <button
          onClick={() => setIsOpen(true)}
          className="mt-8 w-32 h-32 mx-auto rounded-full bg-white shadow-xl flex flex-col items-center justify-center border-4 border-cream-dark cursor-pointer hover:scale-105 transition-transform"
        >
          <Gift size={32} className="text-bronze mb-2" />
          <span className="font-serif text-bronze tracking-widest text-xs">CLICK HERE</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cream rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full relative flex flex-col max-h-[90vh]"
            >
              <div className="flex-1 overflow-auto">
                <img
                  src="/images/pic/CJ_GiftWedding.jpg"
                  alt="Special Gift"
                  className="w-full h-auto block"
                />
              </div>
              <div className="p-4 bg-white border-t border-cream-dark">
                <button
                  onClick={handleDownload}
                  className="luxury-gradient-btn flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-sm font-medium tracking-wide"
                >
                  <Download size={18} />
                  บันทึกรูปภาพ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
