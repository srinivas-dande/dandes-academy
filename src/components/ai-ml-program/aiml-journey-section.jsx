'use client'
import { useState, useEffect } from 'react'

const phases = [
  {
    label: 'Phase 1',
    title: 'Foundations you need for AI and ML',
    items: [
      'Python fundamentals for problem solving and data work.',
      'SQL, data handling, and working with real datasets.',
      'Math for Machine Learning, taught in a practical, usable way.',
    ],
  },
  {
    label: 'Phase 2',
    title: 'Core Machine Learning and applied projects',
    items: [
      'Supervised and unsupervised learning, model training, and evaluation.',
      'Feature thinking, data preparation, and performance improvement.',
      'Mini projects to convert concepts into confidence.',
    ],
  },
  {
    label: 'Phase 3',
    title: 'Deep Learning, NLP, and Computer Vision',
    items: [
      'Neural network fundamentals and advanced Deep Learning.',
      'NLP workflows, text processing, and real-world use cases.',
      'Computer Vision basics and practical implementations.',
    ],
  },
  {
    label: 'Phase 4',
    title: 'Generative AI, LLMs, Agentic AI, and production thinking',
    items: [
      'Generative AI concepts and LLM workflows, including fine-tuning approach.',
      'Agentic AI workflows for modern applications.',
      'MLOps fundamentals and deployment mindset.',
      'One end-to-end capstone project to bring everything together.',
    ],
  },
]

function CheckIcon({ active }) {
  const color = active ? '#22c55e' : '#d1d5db'
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx={10} cy={10} r={9} stroke={color} strokeWidth={1.5} fill="none" />
      <path d="M6 10.5l2.5 2.5 5-5" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AimlJourneySection() {
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const phaseElements = document.querySelectorAll(".phase-block")
      const scrollPosition = window.innerHeight / 2

      phaseElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect()

        if (
          rect.top <= scrollPosition &&
          rect.bottom >= scrollPosition
        ) {
          setActivePhase(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section style={{ backgroundColor: '#fff', padding: '80px 0 88px' }}>
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-start">

        {/* LEFT */}
        <div>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.25, margin: '0 0 28px' }}>
            From Python To <span style={{ color: '#d12027' }}>GenAI</span> And{' '}
            <span style={{ color: '#d12027' }}>MLOps</span>, A Complete Learning Journey
          </h2>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, margin: '0 0 24px' }}>
            This program is designed for people who want a clear learning path, consistent support, and real project work. Whether you are switching to AI from a backend or engineering role, or preparing for placements with a stronger profile, the structure helps you stay on track and build confidence.
          </p>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, margin: 0 }}>
            You always know what to focus on next, what to practice, and what to build. This is especially helpful if you are learning while working full-time or preparing for placements.
          </p>
        </div>

        {/* RIGHT — Timeline */}
        <div style={{ position: 'relative', paddingLeft: 36 }}>
          {/* vertical dashed line */}
          <div style={{
            position: 'absolute',
            left: 10,
            top: 12,
            bottom: 12,
            width: 2,
            borderLeft: '2px dashed #d1d5db',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {phases.map((phase, i) => {
              const isActive = i === activePhase
              return (
              <div
                key={i}
                className="phase-block"
                style={{ position: 'relative' }}
              >
                {/* dot - clickable */}
                <button
                  onClick={() => setActivePhase(i)}
                  style={{
                    position: 'absolute',
                    left: -36,
                    top: 4,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#d12027' : '#e5e7eb',
                    border: isActive ? '3px solid #fca5a5' : '3px solid #f3f4f6',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    padding: 0,
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={`Go to ${phase.label}`}
                />

                {/* phase label */}
                <p style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: isActive ? '#d12027' : '#9ca3af',
                  margin: '0 0 8px',
                  textTransform: 'none',
                  letterSpacing: 0,
                }}>
                  {phase.label}
                </p>

                {/* phase title */}
                <h3 style={{
                  fontSize: isActive ? 20 : 18,
                  fontWeight: 700,
                  color: isActive ? '#1a1a1a' : '#9ca3af',
                  margin: '0 0 16px',
                  lineHeight: 1.3,
                }}>
                  {phase.title}
                </h3>

                {/* items */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {phase.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <CheckIcon active={isActive} />
                      <span style={{
                        fontSize: 14,
                        color: isActive ? '#374151' : '#9ca3af',
                        lineHeight: 1.6,
                      }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
