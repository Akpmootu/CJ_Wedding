import { Music, Pause, Play } from 'lucide-react'

interface FloatingMusicButtonProps {
  playing: boolean
  onToggle: () => void
}

export function FloatingMusicButton({ playing, onToggle }: FloatingMusicButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-cream-dark flex items-center justify-center cursor-pointer transition-transform active:scale-95"
      aria-label={playing ? 'หยุดเพลง' : 'เล่นเพลง'}
    >
      {playing ? (
        <Pause size={16} className="text-terracotta" fill="currentColor" />
      ) : (
        <Play size={16} className="text-terracotta ml-0.5" fill="currentColor" />
      )}
    </button>
  )
}

interface MusicControlProps {
  playing: boolean
  onToggle: () => void
}

export function MusicControl({ playing, onToggle }: MusicControlProps) {
  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-sm cursor-pointer transition-all active:scale-98"
      >
        <Music size={16} className="text-gold-muted" />
        กดเล่นเพลงเพื่อเริ่มเข้าสู่งาน
      </button>
      <button
        type="button"
        onClick={onToggle}
        className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center cursor-pointer bg-transparent"
        aria-label={playing ? 'หยุด' : 'เล่น'}
      >
        {playing ? (
          <Pause size={14} className="text-white" />
        ) : (
          <Play size={14} className="text-white ml-0.5" />
        )}
      </button>
      {playing && (
        <p className="text-gold-muted text-xs tracking-wider animate-pulse">Playing...</p>
      )}
    </div>
  )
}
