import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, X, Minus, Plus } from 'lucide-react'
import { SectionHeader } from '../components/SectionHeader'
import { submitRsvp, isRsvpConfigured } from '../lib/rsvp'

export function RSVP() {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guestCount, setGuestCount] = useState(0)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || attending === null) return

    setStatus('loading')
    setErrorMsg('')

    try {
      if (!isRsvpConfigured) {
        await new Promise((r) => setTimeout(r, 800))
        console.info('RSVP (demo):', { name, attending, guest_count: guestCount, message })
        setStatus('success')
        return
      }

      await submitRsvp({
        name: name.trim(),
        attending,
        guest_count: attending ? guestCount : 0,
        message: message.trim(),
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error && err.message === 'RSVP_NOT_CONFIGURED'
          ? 'กรุณาตั้งค่า Google Sheets Script URL ก่อนใช้งาน'
          : 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      )
    }
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="section-padding bg-cream">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="luxury-card max-w-lg mx-auto p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-peach/30 flex items-center justify-center mx-auto mb-4">
            <Check size={28} className="text-terracotta" />
          </div>
          <h3 className="font-serif text-xl text-bronze mb-2">ขอบคุณสำหรับคำตอบ</h3>
          <p className="text-taupe text-sm">เราได้รับแบบตอบกลับของท่านแล้ว</p>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="section-padding bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="luxury-card max-w-lg mx-auto p-6 sm:p-8"
      >
        <SectionHeader icon={Mail} title="RSVP" subtitle="แบบตอบกลับคำเชิญ" />

        {!isRsvpConfigured && (
          <p className="text-xs text-terracotta/80 bg-peach/20 rounded-lg px-3 py-2 mb-4 text-center">
            โหมดสาธิต — ตั้งค่า Google Sheets Script URL เพื่อบันทึกข้อมูลจริง (ดูคำแนะนำในคำอธิบาย)
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-charcoal mb-1.5">ชื่อ-นามสกุล ของท่าน</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="กรุณาระบุชื่อในการพิมพ์การ์ด"
              required
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white text-sm outline-none focus:border-bronze transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-charcoal mb-2">การเข้าร่วมงาน</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all text-left ${
                  attending === true
                    ? 'border-terracotta bg-peach/10'
                    : 'border-cream-dark bg-white'
                }`}
              >
                <Check size={18} className={attending === true ? 'text-terracotta' : 'text-taupe'} />
                <span className="text-sm">ยินดีเข้าร่วมงาน</span>
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all text-left ${
                  attending === false
                    ? 'border-terracotta bg-peach/10'
                    : 'border-cream-dark bg-white'
                }`}
              >
                <X size={18} className={attending === false ? 'text-terracotta' : 'text-taupe'} />
                <span className="text-sm">ขอแสดงความยินดี แต่ไม่สะดวกเข้าร่วมงาน</span>
              </button>
            </div>
          </div>

          {attending && (
            <div>
              <label className="block text-sm text-charcoal mb-2">
                จำนวนผู้ติดตาม (ไม่รวมตัวท่าน)
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => Math.max(0, c - 1))}
                  className="w-10 h-10 rounded-full border border-cream-dark flex items-center justify-center cursor-pointer bg-white"
                >
                  <Minus size={16} />
                </button>
                <span className="font-serif text-2xl text-bronze w-8 text-center">{guestCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount((c) => c + 1)}
                  className="w-10 h-10 rounded-full border border-cream-dark flex items-center justify-center cursor-pointer bg-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-charcoal mb-1.5">
              คำอวยพรถึง Cherry & Jame
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="เขียนคำอวยพร..."
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white text-sm outline-none focus:border-bronze transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-terracotta text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || attending === null}
            className="luxury-gradient-btn w-full py-3.5 rounded-full text-sm font-medium tracking-wide cursor-pointer disabled:opacity-50"
          >
            {status === 'loading' ? 'กำลังส่ง...' : 'ส่งแบบตอบกลับ'}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
