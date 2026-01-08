'use client';
import { Code, Brain, Cpu, Cloud, Award, FileCode } from 'lucide-react';

export default function LearningJourney() {
  const steps = [
    { id: 1, title: 'Step 1: Build Strong Python & Data Foundations', icon: <Code className="h-6 w-6 text-[#AD1612]" /> },
    { id: 2, title: 'Step 2: Learn Core AI/ML Fundamentals', icon: <Brain className="h-6 w-6 text-[#AD1612]" /> },
    { id: 3, title: 'Step 3: Advance into Deep Learning & NLP', icon: <Cpu className="h-6 w-6 text-[#AD1612]" /> },
    { id: 4, title: 'Step 4: Build Real-World AI/ML Projects', icon: <Cloud className="h-6 w-6 text-[#AD1612]" /> },
    { id: 5, title: 'Step 5: Deploy Models with MLOps & Cloud', icon: <Award className="h-6 w-6 text-[#AD1612]" /> },
    { id: 6, title: 'Step 6: Become Interview-Ready & Career-Focused', icon: <FileCode className="h-6 w-6 text-[#AD1612]" /> },
  ];

  return (
    <section id="journey" className="bg-[#F8FAFC] py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Your <span className="text-[#AD1612]">AI/ML Learning Journey — From Beginner to Industry-Ready</span>
          </h2>
          <p className="mt-2 text-gray-600">
            A clear, structured roadmap that takes you from coding fundamentals to real-world AI/ML roles.
          </p>
        </div>

        {/* 2-column grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              {s.icon}
              <h3 className="text-sm font-semibold text-gray-900 leading-snug">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
