'use client'
import { useState } from 'react'
import Image from 'next/image'

const allFormatCards = [
  {
    bg: '#dcfce7',
    icon: "/icons/liveclass.png",
    title: 'Live Instructor-led Classes',
    desc: 'Live online sessions with clear, step-by-step teaching and real time Q and A.',
  },
  {
    bg: '#fff7ed',
    icon: "/icons/lms-recording.png",
    title: 'Recordings and LMS Access',
    desc: 'Missed a class, catch up on the LMS recordings and revise anytime.',
  },
  {
    bg: '#f3e8ff',
    icon: "/icons/practice-skill.png",
    title: 'Assignments and Continuous Practice',
    desc: 'Regular assignments and evaluations to make progress measurable.',
  },
  {
    bg: '#fef9c3',
    icon: "/icons/roadmap.png",
    title: 'Structured Learning Roadmap',
    desc: 'Follow a clear, paced roadmap so you always know what to learn next.',
  },
  {
    bg: '#ffe4e6',
    icon: "/icons/students.png",
    title: 'Mentor and Community Support',
    desc: 'Get guidance from mentors and stay motivated with a peer learning community.',
  },
]

export function AimlLearningFormat() {
  const [current, setCurrent] = useState(0)
  const total = Math.ceil(allFormatCards.length / 3)
  const visible = allFormatCards.slice(current * 3, current * 3 + 3)

  return (
    <section style={{ backgroundColor: '#f7f8fa', padding: '80px 0 72px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.25, margin: '0 0 4px' }}>
            A Learning Format You Can Manage With A
          </h2>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#d12027', lineHeight: 1.25, margin: '0 0 28px' }}>
            Job Or College
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', maxWidth: 740, margin: '0 auto', lineHeight: 1.75 }}>
            A good curriculum is not enough if you cannot stay consistent. This program is designed to work
            with real schedules. You attend live classes for structure and clarity, and you use the LMS
            recordings and support system to stay on track when you miss a session.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 48 }}>
          {visible.map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 14,
                padding: '40px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                minHeight: 280,
              }}
            >
              <div style={{
                width: 60,
                height: 60,
                backgroundColor: card.bg,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image 
                  src={card.icon}
                  alt={card.title}
                  width={60}
                  height={60}
                  loading="lazy"
                  sizes="28px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.93rem', color: '#6b7280', margin: 0, lineHeight: 1.65 }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nav arrows */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button
            onClick={() => setCurrent(c => Math.max(0, c - 1))}
            disabled={current === 0}
            style={{
              width: 48, height: 48,
              backgroundColor: current === 0 ? '#e5e7eb' : '#d12027',
              border: 'none', borderRadius: 8,
              cursor: current === 0 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width={18} height={18} fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="11,4 5,9 11,14" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent(c => Math.min(total - 1, c + 1))}
            disabled={current === total - 1}
            style={{
              width: 48, height: 48,
              backgroundColor: current === total - 1 ? '#e5e7eb' : '#d12027',
              border: 'none', borderRadius: 8,
              cursor: current === total - 1 ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width={18} height={18} fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7,4 13,9 7,14" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
