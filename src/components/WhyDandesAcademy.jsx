'use client';
import { Lightbulb, Laptop, Target, Users, LineChart, Brain } from 'lucide-react';

export default function WhyDandesAcademy() {
  const features = [
    {
      title: 'Live Instructor-Led Training',
      desc: 'Live, instructor-led sessions by Srinivas Dande (Founder & Instructor) with 20+ years of experience. Focused on practical learning — not just recorded content.',
      icon: <Laptop className="h-6 w-6 text-[#AD1612]" />,
    },
    {
      title: 'Industry-Aligned, Future-Ready Curriculum',
      desc: 'A structured 16-module AI/ML curriculum designed from fundamentals to production-ready systems.',
      icon: <Brain className="h-6 w-6 text-[#AD1612]" />,
    },
    {
      title: 'AI/ML Projects',
      desc: 'Hands-on projects covering Machine Learning, Deep Learning, NLP, and real-world data pipelines.',
      icon: <Lightbulb className="h-6 w-6 text-[#AD1612]" />,
    },
    {
      title: 'Advanced Skills Beyond the Basics',
      desc: 'Learn Generative AI, LLMs, Agentic AI, and production-grade MLOps & deployment practices.',
      icon: <Users className="h-6 w-6 text-[#AD1612]" />,
    },
    {
      title: 'Career Skills Development',
      desc: 'Resume building, LinkedIn optimization, and mock interviews focused on AI/ML roles.',
      icon: <LineChart className="h-6 w-6 text-[#AD1612]" />,
    },
    {
      title: 'Long-Term Learning & Flexibility',
      desc: '12-month structured program, 5-year LMS access, batch switching, and a 30-day refund policy.',
      icon: <Target className="h-6 w-6 text-[#AD1612]" />,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Left heading */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-snug">
              India’s leading <span className="text-[#AD1612]">AI/ML career program</span> — 
              designed by real industry mentors
            </h2>

            <p className="text-gray-700 mb-8 text-base leading-relaxed">
              Learn AI/ML the way industry builds it — with real projects, strong fundamentals, and interview-ready skills.
            </p>

            <button
              onClick={() =>
                document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center rounded-lg bg-[#AD1612] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#92100E] transition shadow"
            >
              Register for Free Webinar
            </button>
          </div>

          {/* Right grid */}
          <div className="lg:col-span-2 grid gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-xl bg-white shadow flex items-center justify-center border border-gray-200">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
