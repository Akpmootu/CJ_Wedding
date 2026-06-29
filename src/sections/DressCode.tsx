import { motion } from 'framer-motion'
import { Shirt } from 'lucide-react'
import { WEDDING } from '../config/wedding'
import { SectionHeader } from '../components/SectionHeader'

export function DressCode() {
  return (
    <section id="dress-code" className="section-padding bg-parchment">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="luxury-card max-w-lg mx-auto p-6 sm:p-8"
      >
        <SectionHeader
          icon={Shirt}
          title="Dress Code"
          subtitle="ธีมสีสำหรับแขกผู้มีเกียรติ"
        />

        <p className="text-center text-taupe text-sm mb-6 leading-relaxed">
          เพื่อความสวยงามในภาพถ่าย ร่วมแต่งกายด้วยชุดโทนสีตามธีมงาน
        </p>

        <div className="flex justify-center gap-3 flex-wrap mb-6">
          {WEDDING.dressCode.map((color, i) => (
            <motion.div
              key={color.hex}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-full shadow-md border border-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-[0.6rem] tracking-wider text-charcoal mt-2 uppercase font-medium">
                {color.name}
              </p>
              <p className="text-[0.55rem] text-taupe">{color.nameTh}</p>
              <p className="text-[0.5rem] text-taupe/70 font-mono">{color.hex}</p>
              {'note' in color && (color as any).note && (
                <p className="text-[0.5rem] text-terracotta mt-0.5">{(color as any).note}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="font-serif text-lg tracking-[0.2em] text-taupe">{WEDDING.hashtag}</p>
        </div>
      </motion.div>
    </section>
  )
}
