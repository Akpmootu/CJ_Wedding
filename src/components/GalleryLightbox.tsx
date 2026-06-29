import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Download, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_IMAGES } from '../config/wedding'
import { useGalleryLikes, saveImage } from '../hooks/useGalleryLikes'

interface GalleryLightboxProps {
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryLightbox({ index, onClose, onNavigate }: GalleryLightboxProps) {
  const { toggleLike, isLiked } = useGalleryLikes()
  const [scale, setScale] = useState(1)

  const image = index !== null ? GALLERY_IMAGES[index] : null

  useEffect(() => {
    setScale(1)
  }, [index])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && index > 0) onNavigate(index - 1)
      if (e.key === 'ArrowRight' && index < GALLERY_IMAGES.length - 1) onNavigate(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onNavigate])

  const handleSave = useCallback(async () => {
    if (!image) return
    await saveImage(image.src, `${image.id}.jpg`)
  }, [image])

  if (index === null || !image) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
        onClick={onClose}
      >
        <div className="flex items-center justify-between p-4 relative z-10" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={onClose} className="text-white/80 bg-transparent border-none cursor-pointer p-2">
            <X size={24} />
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => toggleLike(image.id)}
              className="text-white/80 bg-transparent border-none cursor-pointer p-2"
            >
              <Heart size={22} fill={isLiked(image.id) ? '#F8A3B9' : 'none'} stroke={isLiked(image.id) ? '#F8A3B9' : 'currentColor'} />
            </button>
            <button type="button" onClick={handleSave} className="text-white/80 bg-transparent border-none cursor-pointer p-2">
              <Download size={22} />
            </button>
            <button
              type="button"
              onClick={() => setScale((s) => (s >= 2 ? 1 : s + 0.5))}
              className="text-white/80 bg-transparent border-none cursor-pointer p-2"
            >
              <ZoomIn size={22} />
            </button>
          </div>
        </div>

        <div
          className="flex-1 flex items-center justify-center overflow-hidden px-4"
          onClick={(e) => e.stopPropagation()}
        >
          {index > 0 && (
            <button
              type="button"
              onClick={() => onNavigate(index - 1)}
              className="absolute left-2 z-10 text-white/60 bg-black/30 rounded-full p-2 border-none cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-[70vh] object-contain transition-transform duration-300"
            style={{ transform: `scale(${scale})` }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            drag={scale > 1}
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          />

          {index < GALLERY_IMAGES.length - 1 && (
            <button
              type="button"
              onClick={() => onNavigate(index + 1)}
              className="absolute right-2 z-10 text-white/60 bg-black/30 rounded-full p-2 border-none cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        <p className="text-center text-white/50 text-sm pb-6">
          {index + 1} / {GALLERY_IMAGES.length}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
