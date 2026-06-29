import { motion } from 'framer-motion'
import { WEDDING } from '../config/wedding'
import { MusicControl } from '../components/MusicPlayer'

interface MainCardProps {
  playing: boolean
  onToggleMusic: () => void
}

export function MainCard({ playing, onToggleMusic }: MainCardProps) {
  return (
    <section id="main-card" className="relative min-h-[100dvh] flex flex-col">
      <div className="absolute inset-0">
        <img
          src="/images/pic/CJ (8).jpg"
          alt="Cherry & Jame"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-white px-6 text-center"
      >
        <p className="font-serif text-gold-muted text-sm tracking-[0.3em] mb-4">
          The Wedding Of
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium leading-snug">
          {WEDDING.bride.nickname}
          <span className="block text-lg italic font-normal opacity-90 mt-1">
            ({WEDDING.bride.fullName})
          </span>
        </h1>
        <span className="font-serif text-2xl my-3 opacity-80">&</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium leading-snug">
          {WEDDING.groom.nickname}
          <span className="block text-lg italic font-normal opacity-90 mt-1">
            ({WEDDING.groom.fullName})
          </span>
        </h1>
        <MusicControl playing={playing} onToggle={onToggleMusic} />
      </motion.div>
    </section>
  )
}
