import { useEffect, useRef, useState } from 'react'

export function useInViewOnce(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return undefined

    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return undefined
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])

  return [ref, inView]
}
