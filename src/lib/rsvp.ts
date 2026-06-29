export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

export const isRsvpConfigured = Boolean(GOOGLE_SCRIPT_URL)

export interface RsvpData {
  name: string
  attending: boolean
  guest_count: number
  message: string
}

export async function submitRsvp(data: RsvpData) {
  if (!isRsvpConfigured) {
    throw new Error('RSVP_NOT_CONFIGURED')
  }

  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('attending', data.attending ? 'Yes' : 'No')
  formData.append('guestCount', data.guest_count.toString())
  formData.append('message', data.message)
  formData.append('timestamp', new Date().toLocaleString('th-TH'))

  // no-cors is used to prevent CORS errors from Google Apps Script
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  })
  
  return true
}
