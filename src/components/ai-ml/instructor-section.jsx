"use client"

import Link from "next/link"

const credentials = [
  "20+ years teaching engineers.",
  "Clear from basics to advanced.",
  "Practical learning, no shortcuts.",
  "Links concepts to interviews and real work.",
  "Trusted legacy from JLC."
]

export function InstructorSection() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 600,
      }}
    >
      {/* Full section background image */}
      <img
        src="/images/instructor-bg.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'left center',
          zIndex: 0,
        }}
      />

      {/* Content container - positioned on the right */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 40px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {/* Right - Content */}
        <div style={{ maxWidth: 580, paddingLeft: 0 }}>
          {/* Mobile instructor image - shown only on mobile */}
          <div className="mobile-instructor-image">
            <img
              src="/images/instructor.png"
              alt="Srinivas Dande"
              style={{
                width: '100%',
                maxWidth: 420,
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </div>

            {/* Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#f3e8ff',
                color: '#7c3aed',
                padding: '8px 16px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: '#d12027',
                  borderRadius: 2,
                }}
              />
              Meet Your Instructor
            </span>

            {/* Name */}
            <h2
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: '#111',
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              Srinivas Dande
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 17,
                color: '#374151',
                lineHeight: 1.7,
                marginBottom: 28,
              }}
            >
              Courses at Dandes Academy are led by Srinivas Dande, Founder and Instructor, known for
              clear explanations, strong fundamentals, and practical, interview-focused teaching.
            </p>

            {/* Credentials list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 32 }}>
              {credentials.map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: '#3b82f6',
                      borderRadius: '50%',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 16, color: '#374151' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <Link
                style={{
                  
                  backgroundColor: '#d12027',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                href="/srinivas"
              >
                
                Know More
              </Link>

              {/* Watch on YouTube */}
              <a
                href="https://www.youtube.com/@DandesAcademy"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 500,
                  color: '#111',
                  textDecoration: 'none',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d12027">
                  <path d="M8 5v14l11-7z" />
                </svg>
                  Watch On YouTube
              </a>

              {/* LinkedIn icon */}
              <a
                href="https://www.linkedin.com/in/srinivasdande/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a66c2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      {/* Green star near CTAs */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: '45%',
          zIndex: 2,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="#10b981" />
        </svg>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
      .mobile-instructor-image {
        display: none;
      }

      @media (max-width: 1024px) {
        section > div > div {
          max-width: 100% !important;
          padding-left: 0 !important;
        }
      }

      @media (max-width: 768px) {
        section > img {
          display: none !important;
        }

        .mobile-instructor-image {
          display: flex !important;
          justify-content: center !important;
          margin-bottom: 28px;
        }

        section > div {
          justify-content: center !important;
          padding: 40px 20px !important;
        }

        section > div > div {
          max-width: 100% !important;
          padding-left: 0 !important;
        }

        h2 {
          font-size: 32px !important;
        }
      }
    `}</style>
    </section>
  )
}
