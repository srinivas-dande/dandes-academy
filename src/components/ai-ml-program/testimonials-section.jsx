"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "This course gave me a complete roadmap. I am now confident about my transition into AI/ML. Dande Sir explains every concept with so much clarity and patience. This course gave me real confidence to move into AI/M",
    name: "Anek Kumar Singh",
    role: "Software Development Engineer III",
    company: "JPMorgan Chase, Bangalore",
    videoId: "0tRrs7UXPSE",
  },
  {
    id: 2,
    quote:
      "The biggest value for me was clarity. Instead of jumping between random resources, I had a step-by-step learning path and continuous mentor support.",
    name: "Sasi Kumar",
    role: "Principal Engineer",
    company: "Akshaya Inc, USA",
    videoId: "HByraJiYzcE",
  },
  {
    id: 3,
    quote:
      "What I liked most was the practical approach. The assignments, mini projects, and capstone project helped me gain real confidence in applying AI/ML concepts.",
    name: "Rupesh Kumar",
    role: "Solution Architect",
    company: "Worldline Global Services, Bangalore",
    videoId: "rZmuHjNfEFE",
  },
  {
    id: 4,
    quote:
      "Dande Sir has a unique way of simplifying complex topics. Even difficult concepts in Machine Learning and Deep Learning became easy to understand.",
    name: "Rajkeshwar Prasad",
    role: "Tech Lead",
    company: "HCL Tech, Germany",
    videoId: "M3xQPBnX5QI",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-balance text-black md:text-4xl">
            Trusted by <span className="text-[#d12027]">20 thousand+ learners</span>, here is what they share
          </h2>
          <p className="mx-auto max-w-3xl text-pretty text-gray-600">
            Choosing the right AI and Machine Learning course takes more than reading a curriculum. You want proof that
            learners understood the concepts, completed projects, remained consistent, and felt confident during
            interviews. Here are reviews from learners from diverse backgrounds, working professionals, and
            placement-focused students.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative mx-auto max-w-6xl px-8 md:px-14">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded bg-[#d12027] text-white transition-colors hover:bg-[#b81c22]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded bg-[#d12027] text-white transition-colors hover:bg-[#b81c22]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Card */}
          <div className="rounded-2xl bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50 p-6 md:p-10">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Quote */}
              <div className="flex w-full flex-col justify-center lg:w-2/5">
                <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 md:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mb-6">
                  <p className="font-semibold text-gray-900">~ {current.name}</p>
                  <p className="text-sm text-gray-500">{current.role}</p>
                  <p className="text-sm text-gray-500">{current.company}</p>
                </div>

                {/* Pagination dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentIndex ? "w-8 bg-blue-600" : "w-4 bg-gray-300"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* YouTube Video */}
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg lg:aspect-square lg:h-[470px] lg:w-[470px]">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${current.videoId}`}
                  title={current.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
