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
