import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { WEDDING } from '../config/wedding'

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-cream pb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="max-w-lg mx-auto text-center"
      >
        <h2 className="font-serif text-2xl tracking-[0.15em] text-bronze uppercase mb-1">
          Contact Us
        </h2>
        <div className="gold-divider" />
        <p className="text-taupe text-sm mb-6">ติดต่อสอบถามข้อมูลเพิ่มเติม</p>

        <div className="space-y-4 mb-8">
          {[WEDDING.contact.bride, WEDDING.contact.groom].map((person) => (
            <div key={person.name}>
              <p className="text-charcoal text-sm font-medium">{person.name}</p>
              <a
                href={`tel:${person.phone.replace(/-/g, '')}`}
                className="inline-flex items-center gap-2 text-terracotta text-sm mt-1 no-underline"
              >
                <Phone size={14} />
                {person.phone}
              </a>
            </div>
          ))}
        </div>

        <p className="text-taupe text-xs mb-8">ขออภัยหากไม่ได้เรียนเชิญด้วยตนเอง</p>

        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg bg-cream-dark">
          <img
            src="/images/pic/CJ (9).jpg"
            alt="Thank you"
            className="w-full h-auto block"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
            <p className="font-serif text-4xl text-cream italic drop-shadow-md">Thank You</p>
            <p className="text-white/95 text-sm mt-2 px-6 drop-shadow-md">
              ขอบคุณที่เป็นส่วนหนึ่งในวันสำคัญของเรา
            </p>
          </div>
        </div>

        <footer className="border-t border-cream-dark pt-6">
          <p className="font-serif text-xs tracking-[0.2em] text-taupe uppercase mb-2">
            {WEDDING.bride.nickname} & {WEDDING.groom.nickname} Wedding Vows © 2026
          </p>
          <a
            href="https://www.facebook.com/Mootu00/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.65rem] text-taupe/70 hover:text-terracotta transition-colors uppercase tracking-widest no-underline inline-block"
          >
            powered by.mootu
          </a>
        </footer>
      </motion.div>
    </section>
  )
}
