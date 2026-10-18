import { useState } from 'react'
import { profile, education, projects } from './data.js'

export default function HeroSpotlight() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="spotlight-card" aria-label="Interactive Developer Overview">
      {/* Window Titlebar */}
      <div className="spotlight-card__header">
        <div className="spotlight-card__controls" aria-hidden="true">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="spotlight-card__filename">
          <svg className="icon-code" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>dhanyatha.profile.ts</span>
        </div>
        <div className="spotlight-card__badge">
          <span className="pulse-indicator" />
          <span>Active</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="spotlight-tabs" role="tablist" aria-label="Spotlight tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'overview'}
          className={`spotlight-tab ${activeTab === 'overview' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          // Overview
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'architecture'}
          className={`spotlight-tab ${activeTab === 'architecture' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          // Key Pillars
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'code'}
          className={`spotlight-tab ${activeTab === 'code' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          // Config Spec
        </button>
      </div>

      {/* Tab Panels */}
      <div className="spotlight-card__body">
        {activeTab === 'overview' && (
          <div className="tab-pane tab-pane--overview">
            <div className="spotlight-hero-info">
              <div className="spotlight-avatar">
                <span className="spotlight-avatar__text">DD</span>
                <span className="spotlight-avatar__status" title="Available for opportunities" />
              </div>
              <div>
                <h3 className="spotlight-name">{profile.name}</h3>
                <p className="spotlight-subtitle">CSE Pre-Final Year • Panimalar Engg College</p>
                <div className="spotlight-chips">
                  <span className="chip chip--accent">CGPA 8.7 / 10</span>
                  <span className="chip chip--muted">Chennai, India</span>
                </div>
              </div>
            </div>

            <div className="spotlight-metrics-grid">
              <div className="metric-box">
                <span className="metric-box__value">2x</span>
                <span className="metric-box__label">Internships</span>
                <span className="metric-box__sub">NIELIT & Cognifyz</span>
              </div>
              <div className="metric-box">
                <span className="metric-box__value">3+</span>
                <span className="metric-box__label">Core Domains</span>
                <span className="metric-box__sub">IoT • AI/RAG • Web</span>
              </div>
              <div className="metric-box">
                <span className="metric-box__value">98%</span>
                <span className="metric-box__label">SWAYAM Python</span>
                <span className="metric-box__sub">High Distinction</span>
              </div>
              <div className="metric-box">
                <span className="metric-box__value">Top</span>
                <span className="metric-box__label">Hackathon Finalist</span>
                <span className="metric-box__sub">IEEE WIE & Ideathon</span>
              </div>
            </div>

            <div className="spotlight-status-banner">
              <div className="status-indicator-ring">
                <span className="status-indicator-dot" />
              </div>
              <p className="status-text">
                <strong>Status:</strong> Open to Summer 2026 Developer & Engineering Internships.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="tab-pane tab-pane--architecture">
            <p className="tab-lead">Three core pillars where software intersects real-world problems:</p>
            <div className="architecture-list">
              <div className="arch-item">
                <div className="arch-item__icon arch-item__icon--cyan">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" />
                    <line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" />
                    <line x1="1" y1="14" x2="4" y2="14" />
                  </svg>
                </div>
                <div className="arch-item__content">
                  <h4>IoT & Embedded Systems</h4>
                  <p>ESP8266 sensor telemetry powering automated anomaly detection and remote valve shutoffs.</p>
                </div>
              </div>

              <div className="arch-item">
                <div className="arch-item__icon arch-item__icon--purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="arch-item__content">
                  <h4>AI & Image Authenticity (NIZHAL)</h4>
                  <p>Perceptual hashing and invisible watermarking to detect image theft, redistribution, and asset tampering across platforms.</p>
                </div>
              </div>

              <div className="arch-item">
                <div className="arch-item__icon arch-item__icon--indigo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div className="arch-item__content">
                  <h4>RAG Pipelines & Document Intelligence</h4>
                  <p>Document chunking, vector embeddings, and similarity retrieval grounding LLMs with context to eliminate hallucinations.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="tab-pane tab-pane--code">
            <pre className="code-block">
              <code>
                <span className="code-keyword">interface</span> <span className="code-type">EngineerCandidate</span> {'{\n'}
                {'  '}name: <span className="code-string">"{profile.name}"</span>;\n
                {'  '}degree: <span className="code-string">"{education.degree}"</span>;\n
                {'  '}college: <span className="code-string">"{education.institution}"</span>;\n
                {'  '}cgpa: <span className="code-number">8.7</span>;\n
                {'  '}focus: [\n
                {'    '}<span className="code-string">"IoT & Sensor Networks (ESP8266)"</span>,\n
                {'    '}<span className="code-string">"Applied AI & RAG Vector Systems"</span>,\n
                {'    '}<span className="code-string">"Full-Stack Web (HTML5/CSS3/JS/React)"</span>\n
                {'  '}];\n
                {'  '}availability: <span className="code-string">"Immediate / Summer 2026"</span>;\n
                {'}'}
              </code>
            </pre>
            <div className="code-footer">
              <span className="code-tag">TypeScript v5.4</span>
              <span className="code-tag">ES2024</span>
              <span className="code-tag code-tag--success">All Tests Passing ✓</span>
            </div>
          </div>
        )}
      </div>

      {/* Spotlight Bottom Action Bar */}
      <div className="spotlight-card__footer">
        <a href="#projects" className="spotlight-link">
          Explore Projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="spotlight-link spotlight-link--ghost">
          View Resume
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
