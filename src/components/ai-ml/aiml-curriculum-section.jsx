'use client'

const leftTopics = [
  { num: 1, text: 'Python foundations for AI and ML.' },
  { num: 2, text: 'SQL and data handling for real datasets.' },
  { num: 3, text: 'Math for Machine Learning in an applied, practical way.' },
  { num: 4, text: 'Exploratory Data Analysis and feature thinking.' },
  { num: 5, text: 'Machine Learning, fundamentals to advanced methods.' },
]

const rightTopics = [
  { num: 6, text: 'Deep Learning, with a practical implementation focus.' },
  { num: 7, text: 'Generative AI, LLM concepts, and fine-tuning workflows.' },
  { num: 8, text: 'Natural Language Processing and Computer Vision.' },
  { num: 9, text: 'Agentic AI workflows for modern applications.' },
  { num: 10, text: 'MLOps, deployment mindset, and production considerations.' },
]

function TopicCard({ num, text }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '10px',
        padding: '18px 20px',
      }}
    >
      <span
        style={{
          minWidth: '32px',
          height: '32px',
          backgroundColor: '#f3f4f6',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: '600',
          color: '#6b7280',
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: '700',
          color: '#1a1a1a',
          lineHeight: '1.5',
        }}
      >
        {text}
      </p>
    </div>
  )
}

export function AimlCurriculumSection() {
  return (
    <section
      id="courses"
      style={{
        backgroundColor: '#f7f8fa',
        padding: '72px 0 80px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1a1a1a',
              margin: '0 0 16px',
              lineHeight: '1.2',
            }}
          >
            What You Learn In This{' '}
            <span style={{ color: '#d12027' }}>AI</span>{' '}
            And{' '}
            <span style={{ color: '#d12027' }}>ML</span>{' '}
            Course
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.6',
            }}
          >
            You cover the complete learning path that companies
            <br />
            expect in real AI and ML roles.
          </p>
        </div>

        {/* Core topics label */}
        <p
          style={{
            fontSize: '15px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '20px',
          }}
        >
          Core topics include
        </p>

        {/* 2-column grid of topic cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '20px',
          }}
          className="aiml-grid"
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leftTopics.map(t => (
              <TopicCard key={t.num} num={t.num} text={t.text} />
            ))}
          </div>
          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rightTopics.map(t => (
              <TopicCard key={t.num} num={t.num} text={t.text} />
            ))}
          </div>
        </div>

        {/* Built Around Projects card */}
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '32px 28px',
            marginTop: '8px',
          }}
        >
          <h3
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#1a1a1a',
              margin: '0 0 12px',
              lineHeight: '1.3',
            }}
          >
            Built Around Projects,{' '}
            <span style={{ color: '#d12027' }}>So You Have Proof Of Work</span>
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.7',
              maxWidth: '860px',
            }}
          >
            Throughout the course, you work on assignments and mini projects, and finish with an end-to-end capstone. This helps you
            build a portfolio that enhances your resume and provides strong interview talking points.
          </p>
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .aiml-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
