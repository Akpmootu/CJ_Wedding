import { Home, Calendar, Images, MapPin, Mail } from 'lucide-react'

export type NavSection = 'home' | 'date' | 'gallery' | 'map' | 'rsvp'

const NAV_ITEMS: { id: NavSection; label: string; icon: typeof Home; sectionId: string }[] = [
  { id: 'home', label: 'หน้าแรก', icon: Home, sectionId: 'main-card' },
  { id: 'date', label: 'กำหนดวัน', icon: Calendar, sectionId: 'save-the-date' },
  { id: 'gallery', label: 'คลังภาพ', icon: Images, sectionId: 'gallery' },
  { id: 'map', label: 'แผนที่', icon: MapPin, sectionId: 'location' },
  { id: 'rsvp', label: 'ตอบรับ', icon: Mail, sectionId: 'rsvp' },
]

interface BottomNavProps {
  active: NavSection
  onNavigate: (sectionId: string, navId: NavSection) => void
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-cream-dark shadow-[0_-4px_20px_rgba(61,53,48,0.06)]">
      <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon, sectionId }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(sectionId, id)}
              className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[3.5rem] border-none bg-transparent cursor-pointer transition-colors"
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.6}
                className={isActive ? 'text-terracotta' : 'text-taupe'}
              />
              <span
                className={`text-[0.65rem] ${isActive ? 'text-terracotta font-medium' : 'text-taupe'}`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export { NAV_ITEMS }
