import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'cj-wedding-gallery-likes'

function readLikes(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function useGalleryLikes() {
  const [likes, setLikes] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setLikes(readLikes())
  }, [])

  const toggleLike = useCallback((id: string) => {
    setLikes((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isLiked = useCallback((id: string) => Boolean(likes[id]), [likes])

  return { toggleLike, isLiked }
}

export async function saveImage(src: string, filename: string) {
  const response = await fetch(src)
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
