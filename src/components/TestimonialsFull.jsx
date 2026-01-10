'use client';
import Image from 'next/image';

export default function TestimonialsFull() {
  const testimonials = [
    {
      id: 1,
      name: 'Uma Mahesh',
      role: 'Lead Engineer, Societe Generale',
      highlight: 'AI/ML',
      feedback: '“My learning journey with Srinivas Dande Sir began in 2016 at JLC. From Java fundamentals to advanced areas like System Design and Cloud, DevOps the guidance has been consistent and reliable. I recently joined the AI/ML program at Dandes Academy to expand my technical scope. AI/ML curriculum is designed to simplify complex concepts without losing depth. Sessions encourage analytical thinking and structured problem solving. I strongly recommend Dande’s Academy for Learning AI/ML in-depth.”',
      image: '/images/students/Uma.jpg',
      company: '/images/companies/societegenerale.png',
      linkedin: 'https://www.linkedin.com/in/golakaram-uma-maheshwar-906728178/',
    },
    {
      id: 2,
      name: 'Ravi Ranjan Singh',
      role: 'Technical Manager, WeSure Global Tech',
      feedback: '“After transitioning from ECE to software development, I initially struggled with core concepts. My learning journey changed when I joined JLC in 2015, now Dande’s Academy. Over the years, Srinivas Dande Sir’s teaching has played a key role in my professional growth. When Dande sir launched the AI/ML program, I joined with full confidence—and it met my expectations. I strongly recommend Dande’s Academy for career-oriented learning.”',
      image: '/images/students/Ravi.jpg',
      company: '/images/companies/Wesure.png',
      linkedin: 'https://www.linkedin.com/in/ravi-ranjan-singh-8861b83a/',
    },
    {
      id: 3,
      name: 'Deepak Kumar Singh',
      role: 'Manager, Vodafone (VOIS)',
      feedback: '“I started my learning journey at JLC in 2013 during the early stage of my career under Srinivas Dande Sir. Over the years, I learned Java, Microservices, Angular, and React, which helped me adapt to evolving technologies. When the AI/ML program was introduced at Dandes Academy, I joined with complete confidence. AI/ML curriculum is well structured and updated to reflect current industry standards. This rogram combines conceptual depth with hands-on learning through projects.”',
      image: '/images/students/Deepak.jpg',
      company: '/images/companies/Vois.jpg',
      linkedin: 'https://www.linkedin.com/in/dksftwre/',
    },
    {
      id: 4,
      name: 'Yashwant Kumar',
      role: 'Associate Architect, Virtusa',
      feedback: '“I began my technical learning at JLC in 2007 with a strong focus on Java fundamentals. As my career progressed, I continued learning DSA, AWS, DevOps, and System Design under Srinivas Dande Sir. Transitioning into AI/ML at Dandes Academy felt like the right next step. AI/ML sessions are structured to deepen understanding rather than rush through topics. AI/ML sessions are well structured, in-depth, and closely aligned with industry expectations.”',
      image: '/images/students/yashwant.jpg',
      company: '/images/companies/Virtusa.jpg',
      linkedin: 'https://www.linkedin.com/in/yashwant-kumar-45107529/',
    },
    {
      id: 5,
      name: 'Navneeth Ranjan',
      role: 'Assistant VP, City Corp,Bangalore',
      feedback: '“My technical foundation was built at JLC in 2007 under the guidance of Srinivas Dande Sir. Over the years, I trained in Java Full Stack, DSA, AWS, DevOps, and System Design, which strengthened my problem-solving mindset. Joining the AI/ML program at Dandes Academy felt like a natural progression in my career. AI/ML Course syllabus is structured to gradually move from fundamentals to advanced concepts. Learning experience reflects the same disciplined approach I trusted from the beginning.”',
      image: '/images/students/Navneeth.png',
      company: '/images/companies/Citicorp.jpg',
      linkedin: 'https://www.linkedin.com/in/navneetranjan11/',
    },
    {
      id: 6,
      name: 'Lakshmi kanth',
      role: 'Solution Architect, Deloitte, Bangalore',
      feedback: '“During the early phase of my software career, I joined JLC in 2012 under Srinivas Dande Sir to gain structured guidance. Over time, I learned Java Full Stack, Data Structures, Cloud technologies, and System Design, which built a strong foundation for my career. Recently, I joined the AI/ML program at Dandes Academy to upgrade my skills. Course structure is updated to match current industry standards and follows a clear, step-by-step approach. AI/ML concepts are explained with real-world connections, making the learning experience practical and future-ready.”',
      image: '/images/students/Lakshmikanth.jpg',
      company: '/images/companies/Deloitee.jpg',
      linkedin: 'https://www.linkedin.com/in/lgowrishankar/',
    },
    {
      id: 7,
      name: 'Loknath Kumar',
      role: 'Senior Java Consultant, ADCB bank',
      feedback: '“I was introduced to structured software learning when I joined JLC in 2012 under Srinivas Dande Sir during the early phase of my career. Through this journey, I built strong skills in Java, Data Structures, AWS Cloud, DevOps, and System Design. Recently I have joined the AI/ML program at Dandes Academy. AI/ML course at Dandes Academy is designed with clear progression and focuses on skills that are actively used in the industry today.”',
      image: '/images/students/Loknath.jpg',
      company: '/images/companies/ADCB.png',
      linkedin: 'https://www.linkedin.com/in/loknathkumar/',
    },
    {
      id: 8,
      name: 'Sowjanya VR',
      role: 'Senior Software Engineer-L3, WIPRO(Alumini of TCS)',
      feedback: '“You are a highly passionate and dedicated Java technical trainer who has transformed the careers of over 25,000+ students through your placement-oriented training. Your deep technical knowledge, clear explanations, and real-time industry examples make complex concepts easy to understand. With your constant guidance, motivation, and practical interview preparation, you have helped countless students gain confidence and succeed in placements. You are truly an inspiring mentor and an exceptional trainer.”',
      image: '/images/students/Sowjanya.jpg',
      company: '/images/companies/Wipro.png',
      linkedin: '',
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Here’s what <span className="text-[#AD1612]">My Students</span> said
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Real success stories from learners who upskilled with Dandes Academy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6 flex flex-col"
            >
              {/* Student */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-red-100">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {t.name}
                  </h3>
                  <p className="text-xs text-gray-600">{t.role}</p>
                  {t.linkedin && (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#0A66C2] hover:underline"
                    >
                      View on LinkedIn ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Feedback */}
              <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                {t.feedback}
              </p>

              {/* Company */}
              <div className="flex justify-end mt-6">
                <div className="relative w-20 h-10">
                  <Image
                    src={t.company}
                    alt="Company logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
