import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

/**
 * Accessible typewriter — full text available to assistive tech via sr-only span.
 */
export default function TypewriterText({
  text,
  as: Tag = 'span',
  className = '',
  speed = 52,
  startDelay = 0,
  active = true,
  showCursor = true,
  onComplete,
}) {
  const reducedMotion = usePrefersReducedMotion()
  const [length, setLength] = useState(reducedMotion ? text.length : 0)
  const [started, setStarted] = useState(reducedMotion || !active)

  useEffect(() => {
    if (reducedMotion) {
      setLength(text.length)
      return undefined
    }
    if (!active) {
      setLength(0)
      setStarted(false)
      return undefined
    }

    let startTimer
    let tickTimer
    let i = 0

    startTimer = window.setTimeout(() => {
      setStarted(true)
      tickTimer = window.setInterval(() => {
        i += 1
        setLength(i)
        if (i >= text.length) {
          window.clearInterval(tickTimer)
          onComplete?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(startTimer)
      window.clearInterval(tickTimer)
    }
  }, [text, speed, startDelay, active, reducedMotion, onComplete])

  const visible = text.slice(0, length)
  const done = length >= text.length

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span className="typewriter" aria-hidden="true">
        <span className={`typewriter__text ${started ? 'typewriter__text--started' : ''}`}>
          {visible}
        </span>
        {showCursor && !done && (
          <span className="typewriter__cursor" aria-hidden="true" />
        )}
      </span>
    </Tag>
  )
}
