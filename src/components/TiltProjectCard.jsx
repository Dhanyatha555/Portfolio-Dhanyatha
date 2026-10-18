import { useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

const MAX_TILT = 7

export default function TiltProjectCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reducedMotion || !cardRef.current) return
    const el = cardRef.current
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * MAX_TILT
    const rotateY = (x - 0.5) * MAX_TILT
    el.style.setProperty('--tilt-x', `${rotateX}deg`)
    el.style.setProperty('--tilt-y', `${rotateY}deg`)
    el.style.setProperty('--pointer-x', `${x * 100}%`)
    el.style.setProperty('--pointer-y', `${y * 100}%`)
  }

  const onLeave = () => {
    if (!cardRef.current) return
    const el = cardRef.current
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
    el.style.setProperty('--pointer-x', '50%')
    el.style.setProperty('--pointer-y', '50%')
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="tilt-card__shine" aria-hidden="true" />
      <div className="tilt-card__inner">{children}</div>
    </div>
  )
}
