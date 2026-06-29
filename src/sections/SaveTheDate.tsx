import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { WEDDING } from '../config/wedding'
import { useCountdown, pad } from '../hooks/useCountdown'
import { SectionHeader } from '../components/SectionHeader'

function buildGoogleCalendarUrl() {
  const { title, description, location, start, end } = WEDDING.calendar
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

const COUNTDOWN_LABELS = [
  { key: 'days' as const, label: 'DAYS', labelTh: 'วัน' },
  { key: 'hours' as const, label: 'HOURS', labelTh: 'ชั่วโมง' },
  { key: 'minutes' as const, label: 'MINUTES', labelTh: 'นาที' },
  { key: 'seconds' as const, label: 'SECONDS', labelTh: 'วินาที' },
]

export function SaveTheDate() {
  const countdown = useCountdown()

  return (
    <section id="save-the-date" className="section-padding bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="luxury-card max-w-lg mx-auto p-6 sm:p-8"
      >
        <SectionHeader icon={Calendar} title="Save The Date" />

        <p className="text-center font-medium text-charcoal text-base mb-1">
          {WEDDING.dateThai}
        </p>
        <p className="text-center text-taupe text-xs tracking-[0.2em] mb-6">
          {WEDDING.dateEnglish}
        </p>

        <a
          href={buildGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="luxury-gradient-btn flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full text-sm font-medium tracking-wide no-underline mb-8"
        >
          <Calendar size={16} />
          บันทึกลงปฏิทิน (GOOGLE CALENDAR)
        </a>

        <div className="border-t border-cream-dark pt-6">
          <p className="text-center text-taupe text-xs tracking-[0.2em] mb-4 uppercase">
            Countdown To Our Vows
          </p>
          <div className="grid grid-cols-4 gap-2">
            {COUNTDOWN_LABELS.map(({ key, label, labelTh }) => (
              <div key={key} className="countdown-box">
                <p className="font-serif text-2xl text-bronze font-medium">
                  {pad(countdown[key])}
                </p>
                <p className="text-[0.6rem] text-taupe tracking-wider mt-1 uppercase">
                  {label}
                </p>
                <p className="text-[0.55rem] text-taupe/70">{labelTh}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
