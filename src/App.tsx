import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { EnvelopeOverlay } from './components/EnvelopeOverlay'
import { BottomNav, type NavSection } from './components/BottomNav'
import { FloatingMusicButton } from './components/MusicPlayer'
import { PremiumDivider } from './components/SectionHeader'
import { useYouTubePlayer } from './hooks/useYouTubePlayer'
import { MainCard } from './sections/MainCard'
import { SaveTheDate } from './sections/SaveTheDate'
import { Timeline } from './sections/Timeline'
import { Location } from './sections/Location'
import { Gallery } from './sections/Gallery'
import { RSVP } from './sections/RSVP'
import { DressCode } from './sections/DressCode'
import { Contact } from './sections/Contact'
import { SpecialGift } from './sections/SpecialGift'

function App() {
  const [opened, setOpened] = useState(false)
  const [activeNav, setActiveNav] = useState<NavSection>('home')
  const { playing, play, toggle } = useYouTubePlayer(opened)


  const handleOpenEnvelope = useCallback(() => {
    setOpened(true)
    setTimeout(() => play(), 600)
    setTimeout(() => {
      document.getElementById('main-card')?.scrollIntoView({ behavior: 'smooth' })
    }, 900)
  }, [play])

  const handleNavigate = useCallback((sectionId: string, navId: NavSection) => {
    setActiveNav(navId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
    document.body.style.overflow = ''
  }, [opened])

  useEffect(() => {
    if (!opened) return

    const sectionMap: Record<string, NavSection> = {
      'main-card': 'home',
      'save-the-date': 'date',
      timeline: 'date',
      gallery: 'gallery',
      location: 'map',
      rsvp: 'rsvp',
      'dress-code': 'home',
      contact: 'home',
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const nav = sectionMap[entry.target.id]
            if (nav) setActiveNav(nav)
          }
        })
      },
      { threshold: [0.3], rootMargin: '-20% 0px -50% 0px' },
    )

    Object.keys(sectionMap).forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [opened])

  return (
    <>
      <AnimatePresence>
        {!opened && <EnvelopeOverlay onOpen={handleOpenEnvelope} />}
      </AnimatePresence>

      {opened && (
        <>
          <FloatingMusicButton playing={playing} onToggle={toggle} />
          <main className="flex flex-col gap-6 sm:gap-12 pb-24">
            <MainCard playing={playing} onToggleMusic={toggle} />
            
            <div className="w-full bg-cream -mt-6 sm:-mt-12">
              <img src="/images/pic/2.detail card.jpg" alt="Detail Card" className="w-full h-auto object-contain block" loading="lazy" />
            </div>

            <PremiumDivider />
            <SaveTheDate />
            <PremiumDivider />
            <Timeline />
            <PremiumDivider />
            <Location />
            <PremiumDivider />
            <Gallery />
            <PremiumDivider />
            <RSVP />
            <PremiumDivider />
            <DressCode />
            <PremiumDivider />
            <SpecialGift />
            <PremiumDivider />
            <Contact />
          </main>
          <BottomNav active={activeNav} onNavigate={handleNavigate} />
        </>
      )}
    </>
  )
}

export default App
