import { useEffect, useRef, useCallback } from 'react'
import createGlobe from 'cobe'

export default function Globe({ isDark = false, size = 400 }) {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)

  const onPointerDown = useCallback((e) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }, [])

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }, [])

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }, [])

  const onMouseMove = useCallback((e) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
    }
  }, [])

  useEffect(() => {
    let width = size

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: isDark ? 8 : 4,
      baseColor: isDark ? [0.15, 0.15, 0.18] : [0.92, 0.93, 0.94],
      markerColor: [0.08, 0.72, 0.65],
      glowColor: isDark ? [0.05, 0.2, 0.18] : [0.82, 0.93, 0.91],
      markers: [
        { location: [12.9716, 77.5946], size: 0.08 },
        { location: [22.5726, 88.3639], size: 0.05 },
        { location: [23.6889, 86.9661], size: 0.04 },
      ],
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phiRef.current += 0.005
        }
        state.phi = phiRef.current + pointerInteractionMovement.current / 200
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => globe.destroy()
  }, [isDark, size])

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
      onMouseMove={onMouseMove}
      style={{
        width: size,
        height: size,
        maxWidth: '100%',
        aspectRatio: '1',
        cursor: 'grab',
        contain: 'layout paint size',
      }}
    />
  )
}
