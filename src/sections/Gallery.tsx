import { useState } from 'react'
import { motion } from 'framer-motion'
import { Images, Heart, Download } from 'lucide-react'
import { GALLERY_IMAGES } from '../config/wedding'
import { SectionHeader } from '../components/SectionHeader'
import { GalleryLightbox } from '../components/GalleryLightbox'
import { useGalleryLikes, saveImage } from '../hooks/useGalleryLikes'

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { isLiked } = useGalleryLikes()

  return (
    <section id="gallery" className="section-padding bg-parchment">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="luxury-card max-w-lg mx-auto p-6 sm:p-8"
      >
        <SectionHeader icon={Images} title="Gallery" subtitle="คลังภาพ Pre-Wedding" />

        <div className="grid grid-cols-2 gap-2">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-square rounded-lg overflow-hidden border-none p-0 cursor-pointer group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              {isLiked(img.id) && (
                <Heart
                  size={16}
                  className="absolute top-2 right-2 text-rose"
                  fill="#F8A3B9"
                />
              )}
            </motion.button>
          ))}
        </div>

        <p className="text-center text-taupe text-xs mt-4">
          แตะที่รูปเพื่อดูขนาดใหญ่ · ซูม · ไลค์ · บันทึก
        </p>
      </motion.div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}

export function GalleryQuickActions({
  imageId,
  src,
}: {
  imageId: string
  src: string
}) {
  const { toggleLike, isLiked } = useGalleryLikes()
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => toggleLike(imageId)} className="p-1 border-none bg-transparent cursor-pointer">
        <Heart size={14} fill={isLiked(imageId) ? '#F8A3B9' : 'none'} />
      </button>
      <button type="button" onClick={() => saveImage(src, `${imageId}.jpg`)} className="p-1 border-none bg-transparent cursor-pointer">
        <Download size={14} />
      </button>
    </div>
  )
}
