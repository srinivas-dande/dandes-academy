"use client";

import Script from "next/script";

const faqs = [
  {
    q: "Who can join this course? Is it suitable for freshers and non-IT backgrounds?",
    a: "This course is designed for anyone who wants to build a career in AI/ML. It is suitable for freshers, working professionals, career switchers, non-IT, and non-engineering backgrounds. No prior experience in AI or Machine Learning is required, as the course starts from fundamentals and gradually moves to advanced concepts.",
  },
  {
    q: "What job roles can I apply for after completion?",
    a: "After completing the course, students can apply for various roles such as: Data Analyst, Data Scientist, ML Engineer, AI Engineer, Lead ML Engineer (for experienced professionals), ML Architect (for experienced professionals). The exact role a student can apply for depends on their prior experience, skill level, project exposure, and overall performance during and after the course.",
  },
  {
    q: "What is the average package of placed students?",
    a: "Salary packages vary based on individual skills, prior experience, project quality, and interview performance. Freshers / Entry-level candidates: ₹6 LPA – ₹15 LPA, Professionals with 2–5 years of experience: ₹9 LPA – ₹30 LPA, Professionals with 5–10 years of experience: ₹30 LPA – ₹75 LPA, Professionals with 10+ years of experience: ₹75+ LPA.",
  },
  {
    q: "How will this course help my career?",
    a: "This course helps you build strong AI/ML foundations, gain hands-on project experience, and develop industry-relevant skills. It prepares you to confidently apply for AI/ML roles, perform well in interviews, and grow in your career with practical knowledge and guidance.",
  },
  {
    q: "Do you provide placement assistance, mock interviews, or internships?",
    a: "Yes. We provide placement assistance, including: Resume guidance, Interview preparation, Mock interviews. Internship opportunities may also be provided based on student performance and availability. Placement outcomes depend on individual skills, effort, and performance.",
  },
  {
    q: "What topics are covered in the course syllabus?",
    a: "The course syllabus is comprehensive and industry-oriented. It includes: Python Programming, Advanced SQL and Data Modeling, Exploratory Data Analysis (EDA), Statistics & Mathematics for ML, Machine Learning, Deep Learning, Natural Language Processing (NLP), Generative AI & Large Language Models (LLMs), Agentic AI, MLOps, Real-time projects. A detailed syllabus document will be shared separately.",
  },
  {
    q: "Are hands-on projects and real-time industry projects included?",
    a: "Yes. The course includes multiple hands-on mini-projects to strengthen practical understanding. In addition, students will work on real-time, industry-oriented projects to gain practical exposure and build a strong project portfolio.",
  },
  {
    q: "What is the course duration and access period?",
    a: "The course duration is 12 months, depending on the batch schedule. Students will receive 5 years of LMS access, which includes course recordings and learning materials. This allows students to revise concepts and continue learning even after course completion.",
  },
  {
    q: "Is the course online, and will I get recorded sessions?",
    a: "The course is conducted in online live mode. If you miss any class, recorded sessions will be provided, so you can catch up at your convenience without missing important topics. ",
  },
  {
    q: "What support and guidance will I receive during the course?",
    a: "Students receive continuous support throughout the course, including: Doubt-clearing sessions, Instructor and mentor guidance, Support through live classes and communication channels. This ensures students stay confident and clear with concepts at every stage.",
  },
  {
    q: "Are assessments, exams, and certification provided?",
    a: "Yes. The course includes regular assignments, assessments, and evaluations to track learning progress. After successful completion of the course, students will receive a Course Completion Certificate from Dandes Academy.",
  },
  {
    q: "Who is the instructor?",
    a: "Course is taught by Srinivas Dande, Founder & Instructor at Dandes Academy. He brings 20+ years of industry and teaching experience, with a strong focus on explaining concepts clearly from basics to advanced levels. Course is designed based on real-world industry requirements, helping students gain both theoretical understanding and practical, job-ready skills.",
  },
  {
    q: "What are the prerequisites for this course?",
    a: "There are no strict prerequisites for joining this course. Basic computer knowledge and willingness to learn are sufficient. All required concepts such as programming fundamentals, mathematics, and statistics needed for AI/ML are covered as part of the course.",
  },
  {
    q: "What is the fee structure, installment options, and refund policy?",
    a: "The fee structure and installment options will be clearly explained by our sales team during the counseling call. Refund Policy: If a student is not satisfied with the course content or delivery, a 100% refund will be provided within 30 days of enrollment, without asking any questions.",
  },
  {
    q: "Can I switch batches if I miss classes?",
    a: "Yes, batch switching is allowed. This flexibility ensures that students do not miss learning opportunities due to unavoidable circumstances.",
  },
  {
    q: "How is this course different from other online AI/ML courses?",
    a: "Unlike many other online AI/ML programs, this course offers: A structured and well-paced learning roadmap designed from fundamentals to advanced topics Live, interactive classes with direct instructor involvement, Continuous mentor support and dedicated doubt-clearing sessions, Hands-on mini-projects and real-time industry-oriented projects, Strong focus on interview preparation and placement assistance, This course emphasizes practical learning, personalized guidance, and longterm skill building, helping students stay consistent, confident, and job-ready. ",
  },
];

export default function FAQs() {
  // SEO FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <section className="bg-[#F8FAFC] py-20">
      {/* JSON-LD for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Frequently Asked <span className="text-[#AD1612]">Questions</span>
          </h2>
          <p className="mt-3 text-gray-600">
            Quick answers to common queries about batches, recordings, and career
            support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-base font-semibold text-gray-900">
                  Q{idx + 1}) {item.q}
                </span>
                <span className="ml-4 text-[#AD1612] transition group-open:rotate-45">
                  ＋
                </span>
              </summary>

              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
