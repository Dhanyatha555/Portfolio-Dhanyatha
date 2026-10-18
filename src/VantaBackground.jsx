import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import FOG from 'vanta/dist/vanta.fog.min.js'

// Ensure THREE is globally available for Vanta's internal shader pipeline
if (typeof window !== 'undefined' && !window.THREE) {
  window.THREE = THREE
}

/**
 * VantaBackground
 *
 * Implements a restrained, cinematic Vanta.js FOG shader background.
 * Calibrated specifically for Dhanyatha D's dark navy palette and blue-purple gradients:
 * - baseColor: #08090d (exact canvas match)
 * - lowlightColor: #091224 (deep nocturnal navy)
 * - midtoneColor: #1a153a (deep indigo / royal violet)
 * - highlightColor: #254b77 (subtle celestial cyan-blue ambient glow)
 * - blurFactor: 0.85 (soft volumetric diffusion, no sharp lines)
 * - speed: 0.60 (slow, hypnotic, non-distracting drift)
 *
 * Fully respects `prefers-reduced-motion` and guarantees proper WebGL cleanup.
 */
export default function VantaBackground() {
  const vantaRef = useRef(null)
  const vantaEffectRef = useRef(null)

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !vantaRef.current) return

    try {
      const initFog = FOG && FOG.default ? FOG.default : FOG

      vantaEffectRef.current = initFog({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        // Cinematic palette complementing dark navy and blue-purple accents
        baseColor: 0x08090d,
        lowlightColor: 0x091224,
        midtoneColor: 0x1a153a,
        highlightColor: 0x254b77,
        blurFactor: 0.85,
        speed: 0.6,
        zoom: 1.15,
      })
    } catch (err) {
      console.warn('[Vanta.js FOG] Ambient background initialization note:', err)
    }

    return () => {
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy()
        } catch {
          // Ignore destroy errors during fast refresh
        }
        vantaEffectRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={vantaRef}
      className="vanta-bg-canvas"
      aria-hidden="true"
    >
      {/* Contrast vignette overlay ensuring 100% typography readability */}
      <div className="vanta-contrast-vignette" />
    </div>
  )
}
