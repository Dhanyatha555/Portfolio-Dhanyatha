import { useInViewOnce } from '../hooks/useInViewOnce.js'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
  ...rest
}) {
  const [ref, inView] = useInViewOnce()

  return (
    <Component
      ref={ref}
      className={`reveal ${inView ? 'reveal--visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...rest.style }}
      {...rest}
    >
      {children}
    </Component>
  )
}
