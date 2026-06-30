import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { WEDDING } from '../config/wedding'
import { SectionHeader } from '../components/SectionHeader'

export function Location() {
  return (
    <section id="location" className="section-padding bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="luxury-card max-w-lg mx-auto p-6 sm:p-8"
      >
        <SectionHeader icon={MapPin} title="Wedding Venue" subtitle="สถานที่จัดงาน" />

        <div className="text-center mb-5">
          <p className="font-serif text-charcoal text-lg">{WEDDING.venue.name}</p>
          <p className="font-serif text-bronze text-base mt-1">{WEDDING.venue.subtitle}</p>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-6 h-48">
          <img
            src="/images/pic/CJ (10).jpg"
            alt="สถานที่จัดงาน"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-1.5 flex items-center gap-1.5 shadow-md">
            <MapPin size={14} className="text-red-500" />
            <span className="text-xs text-charcoal font-medium">{WEDDING.venue.name}</span>
          </div>
        </div>

        <a
          href={WEDDING.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="luxury-outline-btn flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-xs font-medium tracking-wider no-underline uppercase"
        >
          <Navigation size={16} />
          เปิดแผนที่ GOOGLE MAPS
        </a>
      </motion.div>
    </section>
  )
}
