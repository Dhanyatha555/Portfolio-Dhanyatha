import { useEffect, useState } from 'react'

const PHASES = {
  idle: { label: 'Normal', note: 'Flow is steady. Nothing to report.' },
  leaking: { label: 'Leak detected', note: 'Flow is rising above the usual range.' },
  alerted: { label: 'Alert sent', note: 'The mobile app has been notified. Close the valve to stop the loss.' },
  closed: { label: 'Valve closed', note: 'Flow is back to zero. A maintenance report is ready.' },
}

const BASE_FLOW = 2.1
const LEAK_FLOW = 6.8

export default function LeakDemo() {
  const [phase, setPhase] = useState('idle')
  const [flow, setFlow] = useState(BASE_FLOW)

  useEffect(() => {
    if (phase !== 'leaking') return undefined
    const t = setTimeout(() => setPhase('alerted'), 2200)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase === 'idle') { setFlow(BASE_FLOW); return undefined }
    if (phase === 'closed') { setFlow(0); return undefined }
    const id = setInterval(() => {
      setFlow((f) => Math.min(LEAK_FLOW, +(f + 0.35).toFixed(1)))
    }, 400)
    return () => clearInterval(id)
  }, [phase])

  const leaking = phase === 'leaking' || phase === 'alerted'
  const closed = phase === 'closed'

  const action = {
    idle: { text: 'Simulate a leak', run: () => setPhase('leaking'), disabled: false },
    leaking: { text: 'Detecting…', run: () => {}, disabled: true },
    alerted: { text: 'Close valve', run: () => setPhase('closed'), disabled: false },
    closed: { text: 'Reset demo', run: () => setPhase('idle'), disabled: false },
  }[phase]

  return (
    <section className={`demo demo--${phase}`} aria-label="Interactive leak detection demo">
      <div className="demo__head">
        <h2 className="demo__title">Leak detector demo</h2>
        <span className="demo__tag">Simulation</span>
      </div>

      <svg className="demo__svg" viewBox="0 0 420 210" role="img"
        aria-label="A water pipe with a sensor, a crack and a valve">
        <rect x="20" y="64" width="380" height="40" rx="20" className="pipe" />
        {!closed && <line x1="34" y1="84" x2="386" y2="84" className="water" />}

        <g transform="translate(110 84)">
          <circle r="16" className="sensor__ring" />
          <circle r="7" className="sensor__dot" />
        </g>
        <text x="110" y="132" textAnchor="middle" className="svg-label">Sensor</text>

        <g transform="translate(222 104)">
          <path d="M-7 -4 L-2 2 L-6 6 L2 12" className={`crack ${leaking ? 'crack--on' : ''}`} />
          {leaking && (
            <>
              <circle className="drop drop--1" cx="0" cy="12" r="3.5" />
              <circle className="drop drop--2" cx="-4" cy="12" r="3" />
              <circle className="drop drop--3" cx="4" cy="12" r="3.5" />
            </>
          )}
        </g>
        <ellipse cx="222" cy="188" rx="46" ry="7" className={`puddle ${leaking ? 'puddle--on' : ''}`} />

        <g transform="translate(332 84)">
          <rect x="-8" y="-40" width="16" height="22" rx="3" className="valve__stem" />
          <rect x="-22" y="-45" width="44" height="10" rx="5" className={`valve__handle ${closed ? 'valve__handle--closed' : ''}`} />
          <rect x="-4" y="-22" width="8" height="42" rx="2" className={`valve__gate ${closed ? 'valve__gate--closed' : ''}`} />
        </g>
        <text x="332" y="132" textAnchor="middle" className="svg-label">Valve</text>
      </svg>

      <dl className="demo__readout">
        <div>
          <dt>Flow</dt>
          <dd>{flow.toFixed(1)} <span>L/min</span></dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd className={`status status--${phase}`}>{PHASES[phase].label}</dd>
        </div>
      </dl>

      <p className="demo__note" aria-live="polite">{PHASES[phase].note}</p>

      <button type="button" className="btn btn--sun" onClick={action.run} disabled={action.disabled}>
        {action.text}
      </button>
    </section>
  )
}
