"use client";
import { useState, useEffect } from "react";

export default function WebinarBody() {

  const [form, setForm] = useState({
    full_Name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitLabel = "Register for Free";
  const [registeredCount, setRegisteredCount] = useState(0);
  
  const onChange = (e) => {
    setError("")
    setSuccess(false)

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading || success) return
    
    if (form.phone.length !== 10) {
      setError("Please enter a valid 10 digit phone number")
      return
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/da-api/webinars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          webinarId,
          fullName: form.full_Name,
          email: form.email,
          phone: form.countryCode + form.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
      setRegisteredCount((prev) => prev + 1);


      setForm({
        full_Name: "",
        email: "",
        phone: "",
        countryCode: "+91",
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const webinarId = "WB-23rd-Apr-26";
  const webinarDate = new Date(2026, 3, 23, 20, 0, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/da-api/webinars?webinarId=${webinarId}`);
        const data = await res.json();

        setRegisteredCount(data.count || 0);

        

      } catch (err) {
        console.error("Failed to load data");
      }
    };

    fetchData();
  }, []);


  const formatWebinarDate = (date) => {
    const d = new Date(date);

    const day = d.getDate();
    const suffix =
      day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
      day % 10 === 3 && day !== 13 ? "rd" : "th";

    const month = d.toLocaleString("en-IN", { month: "short" });
    const year = d.getFullYear();
    const weekday = d.toLocaleString("en-IN", { weekday: "long" });

    const time = d.toLocaleString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${day}${suffix} ${month} ${year} (${weekday}) • ${time}`;
  };

  return (
    <div className="w-full bg-white">
      {/* IMAGE HERO */}
      <section className="w-full bg-white flex justify-center overflow-hidden">
        <img
          src="/webinars/DandesAcedemyWebinar12Mar.png"
          alt="Webinar Banner"
          className="
            w-full
            h-auto
            max-h-[220px]        /* Mobile */
            sm:max-h-[300px]
            md:max-h-[420px]     /* Tablet */
            lg:max-h-[500px]     /* Laptop */
            object-contain
          "
          draggable="false"
        />
      </section>

      {/* MAIN CONTENT + FORM */}
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">
              <div className="border-b pb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-snug">
                  AI Career Switch
 
                  <span className="text-[#124394]">
                    {" "} Blueprint?
                  </span>
                </h1>
                         
                <p className="rounded bg-sky-50 mt-4 text-xl text-zinc-900 md:text-xl">
                  <span className="font-semibold tracking-wide">
                    Free Live Webinar:
                  </span>{" "}
                  <span className="font-semibold tracking-wide text-[#124394]">
                    {formatWebinarDate(webinarDate)}
                  </span>
                </p>

              </div>

              {/* ABOUT */}
              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-[#124394]">
                  Many Software Engineers Are Exploring AI — But Don’t Know Where to Start
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  Today, many software engineers with <span className=" font-semibold">5–20 years</span> of experience are asking the same question: 
                </p>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  
                  <span className=" font-semibold">“How do we move into AI without starting our careers from scratch?”</span>
                </p>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  AI is rapidly becoming a core part of modern software systems.
Companies are building <span className=" font-semibold">AI-powered applications</span>., <span className=" font-semibold">intelligent automation</span>, and <span className=" font-semibold">data-driven platforms</span>.
As a result, many experienced engineers are now exploring <span className=" font-semibold">Artificial Intelligence</span> and <span className=" font-semibold">Machine Learning</span> as the next step in their careers.
                </p>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  
                  <span className=" font-semibold">However, most engineers face a few common challenges:</span>
                </p>

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Too many AI courses but no clear direction</li>
                  <li>
                    Confusion about what skills are actually required
                  </li>
                  <li>
                    Not sure how their existing software experience fits into AI
                  </li>
                  <li>
                    Learning random tools without understanding the full roadmap
                  </li>
                  
                </ul>


                <p className="mt-2 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  Because of this, many engineers start learning AI but soon feel overwhelmed and unsure where to focus.
                </p>

                <p className="mt-2 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  <span className=" font-semibold">The Real Question Engineers Are Asking</span> Instead of starting from zero, most engineers want to understand:
                </p>

                <p className="mt-2 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  <span className=" font-semibold">                  “How can we transition into AI roles by building on our existing software engineering experience?”
</span>
                </p>

                <p className="mt-2 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  This webinar is designed to answer exactly that question.
                </p>

                

              </section>

              {/* WHAT YOU WILL GAIN */}
              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-[#124394]">
                  What You Will Learn in This Webinar
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  You will learn Following in this Webinar:
                </p>

                <ul className="mt-6 list-disc space-y-2 pl-6 text-20 text-zinc-700">
                  <li>Why many <span className=" font-semibold">experienced software engineers</span> are now transitioning into AI careers</li>
                  <li>
                    The difference between <span className=" font-semibold">AI Engineer, ML Engineer</span>
                  </li>
                  <li>
                    The <span className=" font-semibold">key skills software engineers should focus on</span> when moving into AI
                  </li>
                  <li>
                    How your existing software engineering experience can help you in AI
                  </li>
                  <li>
                    The <span className=" font-semibold">technology stack</span> commonly used in modern AI systems
                  </li>
                  <li>
                    A <span className=" font-semibold">clear roadmap to transition from traditional software</span> roles into AI/ML
                  </li>
                </ul>

          

              </section>


              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-[#124394]">
                  Who Can Attend This Webinar?
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  This session is designed for <span className=" font-semibold">software engineers who are exploring a transition into AI/ML roles</span>.

                </p>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  This webinar will be especially useful for:
                </p>

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Software engineers with <span className=" font-semibold">5–20 years of experience</span> exploring AI careers</li>
                  <li>
                    <span className=" font-semibold">Developers, Tech Leads, Architects,</span> and <span className=" font-semibold">Engineering Managers</span>

                  </li>
                  <li>
                    Any engineers curious about <span className=" font-semibold">AI Engineering roles</span>
                  </li>
                  <li>
                    Professionals who want to understand <span className=" font-semibold">how their existing software experience fits into AI</span>
                  </li>
                  <li>
                    Engineers looking to <span className=" font-semibold">future-proof their career in the AI era</span>
                  </li>
                </ul>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  If you are wondering how to move into AI without starting your career from scratch, this session will give you the clarity.

                </p>

              </section>


              {/* MEET THE SPEAKER */}
              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-[#124394]">
                  Meet Srinivas Dande
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  Srinivas Dande is the <span className=" font-semibold">Founder and Lead Trainer at DandesAcademy</span>, with over <span className=" font-semibold">20 of experience</span> in software development, system design, and technical mentoring.
                </p>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  He has trained <span className=" font-semibold">hundreds of students and working professionals</span> across different technology domains and now focuses on building structured AI and ML learning paths aligned with real industry expectations.
                </p>

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Founder & Lead Trainer – DandesAcademy</li>
                  <li>Background in Software Development & System Design</li>
                  <li>Mentor to working professionals transitioning into AI/ML careers</li>
                  <li>Designed a structured AI/ML curriculum — from fundamentals to real-world deployment </li>
                  <li>Focus on practical implementation and industry-relevant skills, not just theory</li>
                </ul>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  His teaching approach <span className=" font-semibold">combines strong fundamentals, practical execution, and industry clarity</span>, helping learners move from confusion to confident career direction.
                </p>
              </section>

              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-[#124394]">
                  Register for the Webinar
                </h2>


                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>
                    Join this Free Live Webinar and <span className=" font-semibold">understand the clear roadmap software engineers are using to transition into AI/ML careers.</span>
                  </li>
                  <li>
                    If you are exploring how to move into AI without starting your career from scratch, this session will give you practical clarity.

                  </li>
                  
                </ul>

          
                <h1 className="mt-4  max-w-5xl text-xl font-extrabold text-zinc-700 text-center mx-auto">
                  <span className="text-[#124394]">Register now</span> to secure your spot.
                  
                </h1>

              </section>
            
            </div>

            {/* RIGHT FORM */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Register for Free
                  </h3>

                  <span className="text-xs font-50 bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                    <span className="text-lg font-semibold">{registeredCount}</span> Users registered
                  </span>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">

                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-16 rounded bg-[#124394]" />
                    <span className="h-1.5 w-16 rounded bg-blue-100" />
                    <span className="h-1.5 w-16 rounded bg-blue-100" />
                    <span className="h-1.5 w-16 rounded bg-blue-100" />
                  </div>

                  {success && (
                    <div className="rounded-md bg-green-50 border border-green-200 text-green-700 px-3 py-2 text-sm font-medium">
                      🎉 You have successfully registered for the webinar!
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Full Name
                    </label>
                    <input
                      name="full_Name"
                      value={form.full_Name}
                      onChange={onChange}
                      
                      placeholder="Firstname Lastname"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      
                      placeholder="Enter email address"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Contact Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={form.countryCode}
                        onChange={onChange}
                        className="w-28 rounded-lg border border-gray-300 px-2 py-2 bg-white text-gray-900"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>

                      <input
                        name="phone"
                        value={form.phone}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/\D/g, "")
                            if (onlyNums.length <= 10) {
                              setSuccess(false)
                              setError("")
                              setForm({ ...form, phone: onlyNums })
                            }
                        }}
                        
                        placeholder="Enter phone number"
                        inputMode="numeric"
                        className="flex-1 rounded-lg border border-gray-300 px-2 py-2 text-gray-900 bg-white"
                        required
                      />
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading || success}
                    className="w-full rounded-lg px-5 py-2.5 text-sm font-semibold text-white bg-[#124394] disabled:opacity-70"
                  >
                    {loading ? "Registering..." : submitLabel}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to be contacted via Email/WhatsApp/Phone.
                  </p>

                </form>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}

