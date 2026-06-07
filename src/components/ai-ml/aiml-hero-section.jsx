"use client"
import { CheckCircle2, Star } from "lucide-react"
import { AimlRegistrationForm } from "./aiml-registration-form"


const features = [
  
  "Live Online Classes + LMS Access + Doubt Support",
  "Assignments, Mini Projects & End-to-End Capstone Project",
  "Machine Learning, Deep Learning, NLP, GenAI/LLMs, Agentic AI & MLOps",
  "Resume Review, Mock Interviews & Career Guidance",
  "25,000+ Students Trained | 20+ Years of Industry Experience",
]

export function AimlHeroSection() {

  const scrollToCourses = () => {
    const courseSection = document.getElementById("courses")
    if (courseSection) {
      courseSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-140px)] overflow-hidden">
      {/* Full Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <img
          src="/images/aiml/hero-bg-aiml.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>

      <div className="max-w-[1300px] 
      mx-auto px-4 lg:px-[70px] py-12 lg:py-16 relative z-10 min-h-[609px]">
        <div className="flex flex-col lg:flex-row justify-between items-start h-full">
          {/* Left Content */}
          <div className="flex-1 max-w-[600px]">
            <h1
  className="font-bold leading-tight mb-6"
  style={{ color: "#000000" }}
>
  <span className=" text #d12027 block text-3xl sm:text-4xl lg:text-5xl " style={{ color:"#AD1612" }}>
    SWITCH TO
  </span>

  <span
    className="block whitespace-nowrap font-bold"
    style={{ fontSize: "2.7rem" }}
  >
    HIGH-PAYING AI/ML ROLES
  </span>
</h1>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              A mentor-led AI/ML Career Program designed for working professionals and Job Seekers who want to transition into Artificial Intelligence and Machine Learning.
            </p>

            {/* Feature List */}
            <ul className="flex flex-col gap-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2
  size={24}
  strokeWidth={2}
  style={{
    color: "#10b981",
    minWidth: "24px",
    minHeight: "24px",
    opacity: 1,
  }}
/>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
  onClick={scrollToCourses}
  style={{
    backgroundColor: "#d12027",
    color: "#ffffff",
    opacity: 1,
    filter: "none",
    border: "none"
  }}
  className="px-6 py-3 rounded font-medium cursor-pointer"
>
  Get course details
</button>

            </div>

            {/* Industry Tag */}
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Star className="size-5 text-amber-400 fill-amber-400 shrink-0" />
              <p>
                Industry-focused training with live learning, practical assignments, and career support.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-auto lg:shrink-0 lg:ml-8">
            <AimlRegistrationForm />
          </div>

        </div>
      </div>
    </section>
  )
}
