import Image from "next/image"

const features = [
  {
    image: "/icons/experience.png",
    iconBg: "bg-orange-100",
    title: "20 plus years",
    description: "of experience, Friendly transition track",
  },
  {
    image: "/icons/duration.png",
    iconBg: "bg-blue-100",
    title: "12 Months",
    description: "Pace you can sustain",
  },
  {
    image: "/icons/live-class.png",
    iconBg: "bg-purple-100",
    title: "Live instructor-led classes",
    description: "Learn with clarity",
  },
  {
    image: "/icons/recordings.png",
    iconBg: "bg-emerald-100",
    title: "LMS recordings",
    description: "included Stay consistent",
  },
  {
    image: "/icons/students.png",
    iconBg: "bg-cyan-100",
    title: "25,000 plus Trained",
    description: "learners Proof of delivery",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          Made for <span className="text-[#d12027]">Working Professionals</span> and
          <br className="hidden md:block" /> Career-Focused Students
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {features.map((feature, index) => (
            <article
              key={index}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-14 h-14 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4 mx-auto`}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={56}
                  height={5}
                />
              </div>
              <p className="text-gray-900 text-sm leading-relaxed">
                <span className="font-bold">{feature.title}</span> {feature.description}
              </p>
            </article>
          ))}
        </div>

        {/* JLC Legacy Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center mb-4">
            <Image
              src="/icons/jlc-logo.png"
              alt="JLC Logo"
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-700 text-base max-w-xl">
            Trusted by learners from the legacy JLC,{" "}
            <span className="font-bold">Java Learning Center</span>,
            <br />
            now Dandes Academy.
          </p>
        </div>
      </div>
    </section>
  )
}
