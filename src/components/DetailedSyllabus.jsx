'use client';
import { useState } from 'react';
import { ChevronDown, BookOpen, FileDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DetailedSyllabus() {
  const modules = [
    {
      id: 1,
      title: 'Course 1: Python Fundamentals',
      points: [
        '__TITLE__:Build a strong programming foundation with Python.',
        'Core Python, OOP, Functional Programming',
        'Decorators, Generators, Exception Handling',
        'File Handling & Problem Solving',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment (Python Problem Solving)',
        'Test 1 - Python Fundamentals',
      ],
    },

    {
      id: 2,
      title: 'Course 2: Python for ML & DS',
      points: [
        '__TITLE__:Learn essential Python libraries used in data science.',
        'NumPy, Pandas',
        'Data analysis & visualization',
        'Matplotlib, Seaborn',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment (Pandas and Plotting)',
        'Test 2 - Python for ML & DS',
      ],
    },

    {
      id: 3,
      title: 'Course 3: SQL, Advanced SQL, and Data Modeling',
      points: [
        '__TITLE__:Master SQL and real-world data modeling.',
        'Advanced SQL, Joins, Window Functions',
        'Indexing & Query Optimization',
        'ERD and Normalization',
        'OLTP vs OLAP, Star & Snowflake Schema',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment (SQL + Data Modeling Case Study)',
        'Test 3 - SQL, Advanced SQL, and Data Modeling',
      ],
    },

    {
      id: 4,
      title: 'Course 4: Mathematics for ML',
      points: [
        '__TITLE__:Understand the math behind machine learning.',
        'Probability & Statistics',
        'Linear Algebra & Calculus',
        'Math intuition for ML algorithms',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment (Math → ML Mapping)',
        'Test 4 - Mathematics for ML & DS',
      ],
    },

    {
      id: 5,
      title: 'Course 5: Exploratory Data Analysis (EDA)',
      points: [
        '__TITLE__:Turn raw data into meaningful insights.',
        'Data cleaning & validation',
        'Handling Missing Data & Outliers',
        'Feature engineering',
        'PCA, data leakage detection',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment (EDA + Feature Engineering Project)',
        'Test 5 - Exploratory Data Analysis (EDA)',
      ],
    },

    {
      id: 6,
      title: 'Course 6: Machine Learning - Foundation',
      points: [
        '__TITLE__:Learn core ML algorithms from scratch.',
        'Supervised & Unsupervised Learning',
        'Regression Algorithms',
        'Classification Algorithms',
        'Clustering Techniques',
        'Model evaluation & metrics',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment - Supervised Learning',
        'Assignment - Unsupervised Learning',
        'Test 6 - Machine Learning - Foundation',
      ],
    },

    {
      id: 7,
      title: 'Course 7: Advanced Machine Learning',
      points: [
        '__TITLE__:Solve real-world ML problems.',
        'Decision Trees, Bagging Techniques',
        'Random Forest, Boosting Techniques',
        'Clustering, Anomaly Detection, Time Series',
        'Model Selection & Optimization',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Mini Project #1 - Supervised Learning',
        'Mini Project #2 - Unsupervised Learning',
        'Test 7 - Advanced Machine Learning',
      ],
    },

    {
      id: 8,
      title: 'Course 8: Deep Learning - Foundation',
      points: [
        '__TITLE__:Build and train neural networks.',
        'Neural Networks & Backpropagation',
        'CNNs, RNNs, LSTMs',
        'PyTorch & TensorFlow',
        'Hyperparameter Tuning & Model Optimization',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment',
        'Test 8 - Deep Learning - Foundation',
      ],
    },

    {
      id: 9,
      title: 'Course 9: Advanced Deep Learning',
      points: [
        '__TITLE__:Go deeper into modern deep learning.',
        'RNN, LSTM, GRU',
        'Transfer Learning',
        'Training stability & optimization',
        'Explainable AI (SHAP, LIME)',
        'High-level Transformers',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Mini Project #3 - Deep Learning Applications',
        'Test 9 - Advanced Deep Learning',
      ],
    },

    {
      id: 10,
      title: 'Course 10: Computer Vision',
      points: [
        '__TITLE__:Work on real-world vision problems.',
        'Image Classification',
        'Object Detection (YOLO, SSD, Faster R-CNN)',
        'CNN architectures',
        'Image Augmentation & Preprocessing',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Mini Project #4 - Image Classification',
        'Mini Project #5 - Real-Time Object Detection',
        'Test 10 - Computer Vision',
      ],
    },

    {
      id: 11,
      title: 'Course 11: Natural Language Processing (NLP)',
      points: [
        '__TITLE__:Build NLP and chatbot systems.',
        'Text preprocessing & embeddings',
        'Neural Networks for NLP',
        'Seq2Seq & Transformers',
        'NER & Sentiment Analysis',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Mini Project #6 - AI Chatbot for Customer Support',
        'Test 11 - Natural Language Processing (NLP)',
      ],
    },

    {
      id: 12,
      title: 'Course 12: Generative AI',
      points: [
        '__TITLE__:Create AI that generates images and content.',
        'Autoencoders & GANs',
        'Diffusion Models (Stable Diffusion)',
        'Image-to-Image & Text-to-Image',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Mini Project #7 - AI-Generated Art & Image-to-Image Translation',
        'Test 12 - Generative AI',
      ],
    },

    {
      id: 13,
      title: 'Course 13: LLMs & Fine-Tuning',
      points: [
        '__TITLE__:Work with Large Language Models.',
        'GPT, BERT, LLaMA, Claude',
        'LangChain and LlamaIndex',
        'Fine-Tuning & LoRA',
        'RAG (Retrieval-Augmented Generation)',
        'Building AI Chatbots & Assistants',
        'Code Generation using LLMs',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Mini Project #8 - Fine-Tuning an LLM for a Domain-Specific Chatbot',
        'Test 13 - LLMs & Fine-Tuning',
      ],
    },

    {
      id: 14,
      title: 'Course 14: Agentic AI (Autonomous & Multi-Agent Systems)',
      points: [
        '__TITLE__:Build autonomous AI agents.',
        'LLMs as reasoning agents',
        'Single-Agent vs Multi-Agent Systems',
        'Tool calling & Memory in Agents',
        'Planning & Reasoning',
        'Agent Frameworks & Tooling',
        'Autonomous AI Agents',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Mini Project #9 - Build an Autonomous AI Agent',
        'Test 14 - Agentic AI',
      ],
    },

    {
      id: 15,
      title: 'Course 15: MLOps',
      points: [
        '__TITLE__:Deploy and manage AI systems in production.',
        'ML pipelines & CI/CD',
        'MLOps Tooling & Platforms',
        'Model deployment & monitoring',
        'Drift detection & scalability',
      ],
      extras: [
        '__TITLE__:Assessment',
        'Practice Questions',
        'Assignment',
        'Test 15 - MLOps',
      ],
    },

    {
      id: 16,
      title: 'Course 16: Final End-to-End AI/ML Project',
      points: [
        '__TITLE__:AI-Powered Personal Assistant (Multi-Modal AI Agent)',
        'LLMs + Vision + NLP',
        'Agentic AI + MLOps',
        'Deployment & monitoring',
      ],
    },



  ];


  const [openId, setOpenId] = useState(1);
  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };


  return (
    <section id="syllabus" className="bg-[#F8FAFC] py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        {/* Heading bar */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Detailed Syllabus</h2>
            <p className="mt-2 text-gray-600">
              15 modules — from Python to LLMs & MLOps, finishing with an end-to-end capstone.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="#lead-capture"
              className="inline-flex items-center gap-2 rounded-lg border border-[#AD1612] px-4 py-2 text-sm font-semibold text-[#AD1612] hover:bg-red-50 transition"
            >
              <FileDown className="h-4 w-4" /> Download Syllabus (PDF)
            </Link>
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-lg bg-[#AD1612] px-4 py-2 text-sm font-semibold text-white hover:bg-[#92100E] transition"
            >
              Register Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>


        <div className="grid gap-4">
          {modules.map((m) => {
            const isOpen = openId === m.id;
            return (
              <div key={m.id} className="rounded-xl bg-white shadow-sm hover:shadow-md transition p-4 sm:p-5 border border-gray-200">
                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  className="w-full flex items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-100">
                      <BookOpen className="h-5 w-5 text-[#AD1612]" />
                    </span>
                    <span className="font-semibold text-gray-900">{m.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-4 pl-12 text-sm text-gray-700 leading-relaxed">
                    <p className="mb-2">
                      Detailed topics, hands-on labs, and assignments for{" "}
                      <span className="font-medium">{m.title}</span>.
                    </p>
                    <ul className="grid grid-cols-1 gap-y-2 list-disc pl-5 marker:text-[#AD1612]">
                      {m.points.map((point, index) => {
                        // 🔴 Highlighted title line
                        if (point.startsWith('__TITLE__:')) {
                          return (
                            <li
                              key={index}
                              className="list-none font-semibold text-gray-900 mt-4"
                            >
                              {point.replace('__TITLE__:', '')}
                            </li>
                          );
                        }

                        // 🔵 Normal bullet
                        return <li key={index}>{point}</li>;
                      })}
                    </ul>


                    {/* Extras */}
                    {m.extras && (
                      <ul className="mt-6 grid grid-cols-1 gap-y-2 pl-5">
                        {m.extras.map((item, index) => {
                          // 🔴 TITLE (Assessment)
                          if (item.startsWith('__TITLE__:')) {
                            return (
                              <li
                                key={index}
                                className="list-none font-semibold text-gray-900 mt-4"
                              >
                                {item.replace('__TITLE__:', '')}
                              </li>
                            );
                          }

                          // 🔵 Normal bullet
                          return (
                            <li
                              key={index}
                              className="list-disc marker:text-[#AD1612] font-medium"
                            >
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    )}


                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 rounded-lg bg-[#AD1612] px-5 py-3 text-sm font-semibold text-white hover:bg-[#92100E] transition"
          >
            Enroll for the next AI/ML Course Cohort <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
