import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'

export function Timeline() {
  return (
    <section id="timeline" className="section-padding bg-parchment">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="luxury-card max-w-lg mx-auto p-6 sm:p-8"
      >
        <SectionHeader
          icon={Clock}
          title="Wedding Timeline"
          subtitle="กำหนดการในวันงาน"
        />

        <div className="mt-8 mx-auto flex justify-center">
          <img
            src="/images/timeline-crop.jpg"
            alt="Wedding Timeline"
            className="max-w-full h-auto rounded-xl shadow-sm border border-cream-dark"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  )
}
