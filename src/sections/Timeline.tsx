import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { FaDrum, FaRing, FaWater, FaUtensils } from 'react-icons/fa6'
import { WEDDING } from '../config/wedding'
import { SectionHeader } from '../components/SectionHeader'

const getIcon = (title: string) => {
  if (title.includes('แห่ขันหมาก')) return <FaDrum className="w-6 h-6 text-bronze" />
  if (title.includes('สวมแหวน')) return <FaRing className="w-6 h-6 text-bronze" />
  if (title.includes('รดน้ำสังข์')) return <FaWater className="w-6 h-6 text-bronze" />
  if (title.includes('อาหาร')) return <FaUtensils className="w-6 h-6 text-bronze" />
  return <Clock className="w-6 h-6 text-bronze" />
}

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

        <div className="relative mt-8 max-w-sm mx-auto">
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-bronze/30" />

          {WEDDING.timeline.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative mb-8 last:mb-0 flex items-center gap-6"
            >
              <div className="w-14 h-14 shrink-0 rounded-full bg-white border border-bronze flex items-center justify-center shadow-md z-10 relative">
                {getIcon(item.title)}
              </div>

              <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-cream-dark">
                <p className="font-serif text-bronze text-xl font-medium mb-1 tracking-wider">{item.time}</p>
                <p className="text-charcoal text-sm">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
