import { useEffect, useState } from 'react'
import { WEDDING } from '../config/wedding'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcCountdown(target: Date): Countdown {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function useCountdown() {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    calcCountdown(WEDDING.date),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(calcCountdown(WEDDING.date))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return countdown
}

export function pad(n: number) {
  return String(n).padStart(2, '0')
}
