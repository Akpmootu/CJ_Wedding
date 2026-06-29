import { useCallback, useEffect, useRef, useState } from 'react'
import { WEDDING } from '../config/wedding'

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          height?: string
          width?: string
          videoId: string
          playerVars?: Record<string, string | number>
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
            onStateChange?: (event: { data: number }) => void
          }
        },
      ) => YTPlayer
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  getPlayerState: () => number
}

let apiLoading = false
let apiLoaded = false
const loadQueue: (() => void)[] = []

function loadYouTubeAPI() {
  if (apiLoaded) return Promise.resolve()
  if (apiLoading) {
    return new Promise<void>((resolve) => loadQueue.push(resolve))
  }

  apiLoading = true
  return new Promise<void>((resolve) => {
    loadQueue.push(resolve)
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true
      apiLoading = false
      loadQueue.forEach((fn) => fn())
      loadQueue.length = 0
    }
    document.head.appendChild(tag)
  })
}

export function useYouTubePlayer(enabled: boolean) {
  const playerRef = useRef<YTPlayer | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) return

    let mounted = true

    loadYouTubeAPI().then(() => {
      if (!mounted || !window.YT) return

      if (!document.getElementById('yt-player')) {
        const div = document.createElement('div')
        div.id = 'yt-player'
        div.style.cssText = 'position:fixed;width:0;height:0;opacity:0;pointer-events:none;'
        document.body.appendChild(div)
      }

      playerRef.current = new window.YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: WEDDING.youtubeId,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: WEDDING.youtubeId,
          controls: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (mounted) setReady(true)
          },
          onStateChange: (event) => {
            if (!window.YT) return
            setPlaying(event.data === window.YT.PlayerState.PLAYING)
          },
        },
      })
    })

    return () => {
      mounted = false
    }
  }, [enabled])

  const play = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo()
      setPlaying(true)
    }
  }, [])

  const pause = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo()
      setPlaying(false)
    }
  }, [])

  const toggle = useCallback(() => {
    if (playing) pause()
    else play()
  }, [playing, play, pause])

  return { playing, ready, play, pause, toggle }
}
