import Image from "next/image";
import Link from "next/link";

export default function Instructor() {
  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* 30% / 70% Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-10 items-center">

          {/* LEFT: Instructor Image (30%) */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-lg border-4 border-[#FECACA]">
              <Image
                src="/images/srinivasdande.jpg"
                alt="Srinivas Dande - Founder & Lead Instructor"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* RIGHT: Instructor Info (70%) */}
          <div>
            <span className="inline-block bg-[#FEE2E2] text-[#AD1612] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Meet Your Instructor
            </span>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Srinivas Dande
            </h2>

            <h3 className="text-lg font-semibold text-[#AD1612] mb-4">
              Founder & Lead Instructor — Dandes Academy
            </h3>

            <p className="text-gray-700 mb-4 font-medium">
              🔹 20+ Years Experience &nbsp;|&nbsp; 🔹 Ex–Sun Microsystems &nbsp;|&nbsp; 🔹 AI/ML, System Design, DSA
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              With <strong>20+ years of experience</strong>, Srinivas brings deep expertise in
              <strong> product development, system architecture, and training</strong>. He started
              his career at <strong>Sun Microsystems</strong> and has trained
              <strong> thousands of engineers</strong> in Java, System Design, and modern AI/ML.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>
                His teaching approach blends real-world engineering with interview-focused
                preparation
              </strong>, helping learners build strong fundamentals, work on practical projects,
              and confidently prepare for technical interviews.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Students value his <strong>step-by-step teaching, real-world examples, and clear guidance</strong> that translate directly into skills required for real projects and interviews.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://www.linkedin.com/in/srinivasdande/"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-[#0A66C2] px-5 py-2 text-sm font-semibold text-white shadow hover:bg-[#084A8F] transition"
              >
                Connect on LinkedIn
              </Link>

              <Link
                href="https://www.youtube.com/@DandesAcademy"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg border border-[#AD1612] px-5 py-2 text-sm font-semibold text-[#AD1612] hover:bg-red-50 transition"
              >
                Watch on YouTube 🎥
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}