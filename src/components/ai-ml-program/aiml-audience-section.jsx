'use client'

import { useState } from 'react'

const tabs = [
  { id: 'professionals', label: 'For Working Professionals' },
  { id: 'students', label: 'For Students and Job Seekers' },
]

const professionalsContent = {
  heading: 'AI And Machine Learning Course For Working Professionals',
  description:
    'If you are already working in tech and want to move into AI and ML, this course is built to fit real schedules and real career goals. You learn with live classes, recordings when you miss a session, and a paced roadmap that focuses on long-term mastery.',
  cardTitle: 'You will benefit most if you want to:',
  benefits: [
    'Transition into AI and ML roles without quitting your job.',
    'Break career stagnation by adding high-impact, future-proof skills.',
    'Stop relying on scattered resources and follow one structured roadmap.',
    'Build projects you can confidently explain in interviews.',
  ],
  footnote:
    'If you want a shortcut to three months, this program may not be the right fit. If you want a structured path with real depth, this is designed for you.',
}

const studentsContent = {
  heading: 'AI And Machine Learning Course For Students And Job Seekers',
  description:
    'If you are a student or recent graduate looking to break into AI and ML, this program gives you the structured path, hands-on projects, and interview preparation you need to stand out.',
  cardTitle: 'You will benefit most if you want to:',
  benefits: [
    'Build a portfolio of real AI and ML projects from scratch.',
    'Learn concepts that go beyond what colleges typically teach.',
    'Prepare for placements with structured practice and mock interviews.',
    'Get mentorship and guidance through every stage of the program.',
  ],
  footnote:
    'If you are looking for shortcuts or quick certifications, this may not be the right fit. If you want to deeply learn and build real skills, this is for you.',
}

export function AimlAudienceSection() {
  const [activeTab, setActiveTab] = useState('professionals')
  const content = activeTab === 'professionals' ? professionalsContent : studentsContent

  return (
    <section style={{ backgroundColor: '#fff', padding: '72px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1a1a2e', lineHeight: '1.25', marginBottom: '20px' }}>
            Who Should Join This{' '}
            <span style={{ color: '#c0392b' }}>AI</span>
            {' '}And{' '}
            <span style={{ color: '#c0392b' }}>Machine Learning</span>
            {' '}Course
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', maxWidth: '660px', margin: '0 auto', lineHeight: '1.7' }}>
            This program is designed for people who want a clear learning path, consistent support, and real project work.
            Whether you are switching to AI from a backend or engineering role, or preparing for placements with a stronger
            profile, the structure helps you stay on track and build confidence.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            backgroundColor: '#f7f8fa',
            borderRadius: '0',
            marginLeft: '-24px',
            marginRight: '-24px',
            padding: '0 24px',
            marginBottom: '56px',
          }}
        >
          <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '20px 24px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: '#1a1a2e',
                  backgroundColor: activeTab === tab.id ? '#fff' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '3px solid #c0392b' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '20px' }}>
            {content.heading}
          </h3>
          <p style={{ color: '#555', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
            {content.description}
          </p>
        </div>

        {/* Benefits card */}
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto 40px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '28px 32px',
            backgroundColor: '#fff',
          }}
        >
          <p style={{ fontWeight: '700', fontSize: '1rem', color: '#1a1a2e', marginBottom: '20px' }}>
            {content.cardTitle}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {content.benefits.map((benefit, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* Green circle check icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ flexShrink: 0, marginTop: '1px' }}
                >
                  <circle cx="11" cy="11" r="10" stroke="#22c55e" strokeWidth="1.5" fill="none" />
                  <path
                    d="M7 11.5l2.5 2.5 5-5"
                    stroke="#22c55e"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.6' }}>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footnote */}
        <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
          {content.footnote}
        </p>
      </div>
    </section>
  )
}
