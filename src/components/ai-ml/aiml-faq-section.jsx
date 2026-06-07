'use client'
import { useState } from 'react'

const faqData = [
  {
    q: '1. Do I need prior experience in AI or Machine Learning?',
    a: 'No. The program is structured to start with foundations and build up step by step. Basic coding familiarity helps, but you do not need prior AI experience.',
  },
  {
    q: '2. Is this course suitable for working professionals?',
    a: 'Yes. The course is designed with flexible schedules, recorded sessions, and weekend live classes to accommodate working professionals.',
  },
  {
    q: '3. How long is the AI and ML course?',
    a: 'The program runs for approximately 12 months, covering foundational to advanced topics with hands-on projects throughout.',
  },
  {
    q: '4. Will I get projects and a capstone?',
    a: 'Yes. You will work on multiple mini-projects and one comprehensive capstone project that you can showcase in your portfolio.',
  },
  {
    q: '5. What topics are covered in the program?',
    a: 'Topics include Python, SQL, Math for ML, Machine Learning, Deep Learning, NLP, Computer Vision, Generative AI, LLMs, Agentic AI, and MLOps.',
  },
  {
    q: '6. Is the course fully recorded or live?',
    a: 'The course includes live instructor-led sessions with recordings available on the LMS for revision and catch-up.',
  },
  {
    q: '7. Do I need strong math to start?',
    a: 'No. Math concepts are taught in a practical, applied manner as part of the curriculum. You do not need advanced math background.',
  },
  {
    q: '8. Do you provide placement support or guarantee placement?',
    a: 'We provide placement support including resume building, interview preparation, and job referrals. We do not guarantee placement.',
  },
  {
    q: '9. Can I switch batches if my schedule changes?',
    a: 'Yes. You can request a batch switch if your schedule changes, subject to availability.',
  },
  {
    q: '10. What is the course fee, and are EMIs available?',
    a: 'Please contact our team for current pricing. Yes, EMI options are available to make the program more accessible.',
  },
  {
    q: '11. Is there a refund policy?',
    a: 'Yes. We have a refund policy. Please review our terms or contact support for specific details.',
  },
  {
    q: '12. What is the best first step before enrolling?',
    a: 'Book a counseling call to understand the program structure and see if it fits your goals.',
  },
]

export function AimlFaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', margin: '0 0 12px' }}>
            Questions to ask before joining an AI and ML course
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>
            Quick answers to common queries about batches, recordings, and career support.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqData.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: 12,
                  borderLeft: '4px solid transparent',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1a1a1a' }}>
                    {item.q}
                  </span>
                  <span style={{
                    fontSize: 22,
                    fontWeight: 300,
                    color: '#d12027',
                    marginLeft: 16,
                    flexShrink: 0,
                  }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 24px 20px', color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
