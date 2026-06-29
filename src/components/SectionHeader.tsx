import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  subtitle?: string
}

export function SectionHeader({ icon: Icon, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-6">
      <div className="section-icon-ring">
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <h2 className="font-serif text-xl tracking-[0.15em] text-bronze uppercase">{title}</h2>
      <div className="gold-divider" />
      {subtitle && <p className="text-taupe text-sm mt-1">{subtitle}</p>}
    </div>
  )
}

interface ImageDividerProps {
  src: string
  index: number
}

export function ImageDivider({ src, index }: ImageDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full h-48 sm:h-56 overflow-hidden my-1"
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover object-[center_25%]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/30 via-transparent to-cream/30" />
    </motion.div>
  )
}

export function PremiumDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-bronze-light" />
      <div className="mx-4 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 border border-bronze" />
      <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-bronze-light" />
    </div>
  )
}
