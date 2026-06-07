"use client"

export function AimlCTASection() {

  return (
    <section className="py-16 md:py-24 bg-[#FAEDFF] relative overflow-hidden">
      {/* Decorative triangles */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-48 text-purple-300 opacity-60"
        viewBox="0 0 100 200"
        fill="currentColor"
      >
        <polygon points="0,0 100,100 0,200" />
      </svg>
      <svg
        className="absolute right-0 top-1/3 w-32 h-64 text-purple-300 opacity-60"
        viewBox="0 0 100 200"
        fill="currentColor"
      >
        <polygon points="100,0 0,100 100,200" />
      </svg>
      <svg
        className="absolute right-20 bottom-10 w-16 h-32 text-purple-200 opacity-40"
        viewBox="0 0 100 200"
        fill="currentColor"
      >
        <polygon points="100,0 0,100 100,200" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#000000" }}
          >
            Ready to start, choose your course and get the details
          </h2>

          <p className="text-gray-600 mb-8">
            Choose the course you are interested in, share your goal, and we will send you the syllabus, fee details, and next batch schedule. If you are unsure whether to start with AI and ML, System Design, or DSA, our team will guide you based on your background and target role.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
  onClick={() => {
    document
      .getElementById("registration-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }}
  className="bg-[#d12027] text-white px-8 py-3 rounded font-medium hover:bg-[#b81c22] transition-colors cursor-pointer"
>
  Get course details
</button>

          </div>

          <p className="text-sm text-gray-500">
            Live online classes with LMS recordings. No spam, your details are used only to share course information and contact you about your inquiry.
          </p>
        </div>


      </div>
        

    </section>
  )
}
