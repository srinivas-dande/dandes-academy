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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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

  


  const webinarId = "WB-18th-Feb-26";
  const webinarDate = new Date(2026, 1, 18, 20, 0, 0);



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
    src="/webinars/ai-ml-webinar.png"
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
                  Confused Between 
                  <span className="text-[#AD1612]">
                    {" "}AI-Engineer or ML Engineer?
                  </span>
                </h1>
                         
                <p className="rounded bg-sky-50 mt-4 text-xl text-zinc-900 md:text-xl">
  <span className="font-semibold tracking-wide">
    Free Live Webinar:
  </span>{" "}
  <span className="font-semibold tracking-wide text-[#AD1612]">
    {formatWebinarDate(webinarDate)}
  </span>
</p>

              </div>

              {/* ABOUT */}
              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-red-700">
                  What You’ll Learn
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  This session will give you complete clarity on AI Engineer and ML Engineer roles — what they actually do, what skills you need, and how to build a structured roadmap to enter the field confidently.
                </p>

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Real difference between AI Engineer and ML Engineer roles in industry</li>
                  <li>
                    Core responsibilities of each role in real-world projects
                  </li>
                  <li>
                    Skills and tools you need to master
                  </li>
                  <li>
                    Correct learning order — what to learn first, what next
                  </li>
                  <li>
                    Common mistakes learners make while entering AI/ML
                  </li>
                  <li>
                    How AI Engineering actually works in real companies today
                  </li>
                  <li>
                    What kind of Projects you should build to stand out in interviews
                  </li>
                  <li>
                    Step-by-Step Roadmap — from Foundation to Development to Deployment
                  </li>
                </ul>
              </section>

              {/* WHAT YOU WILL GAIN */}
              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-red-700">
                  How AI Engineering Actually Works in Industry Today
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">

                  There is a lot of confusion about AI careers.
                  Many people think companies build AI models from scratch.
                  In reality, most companies work very differently.
                </p>

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Most companies do NOT train large models from scratch</li>
                  <li>
                    They use existing foundation models and APIs
                  </li>
                  <li>
                    The real work is in integration, architecture, and deployment
                  </li>
                  <li>
                    Understanding both AI tools and ML fundamentals gives you an advantage
                  </li>
                  <li>
                    The industry expects practical problem-solvers — not just theory learners
                  </li>
                </ul>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  In this webinar, you’ll understand how modern AI teams actually operate — and where you fit into that ecosystem.
                </p>

              </section>


              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-red-700">
                  Who Can Attend This Webinar?
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">

                  This session is designed for anyone serious about building a career in AI or Machine Learning.
                </p>

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Working professionals exploring a transition into AI/ML</li>
                  <li>
                    Software developers curious about AI Engineering roles
                  </li>
                  <li>
                    Freshers confused between AI Engineer and ML Engineer paths
                  </li>
                  <li>
                    Data enthusiasts who want structured clarity instead of random learning
                  </li>
                  <li>
                    Professionals looking to future-proof their career in 2026 and beyond
                  </li>
                </ul>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  If you are unsure where to start in AI, this session will give you clarity.
                </p>

              </section>


              {/* MEET THE SPEAKER */}
              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-red-700">
                  Meet Srinivas Dande
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  Srinivas Dande is the Founder and Lead Trainer at DandesAcademy, with over 20 of experience in software development, system design, and technical mentoring.
                </p>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  He has trained hundreds of students and working professionals across different technology domains and now focuses on building structured AI and ML learning paths aligned with real industry expectations.
                </p>

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Founder & Lead Trainer – DandesAcademy</li>
                  <li>Background in Software Development & System Design</li>
                  <li>Mentor to working professionals transitioning into AI/ML</li>
                  <li>Designed structured AI/ML curriculum — from foundation to development to deployment</li>
                  <li>Focus on practical, real-world implementation — not just theory</li>
                </ul>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed">
                  His approach combines fundamentals, practical execution, and industry clarity — helping learners move from confusion to confident career direction.
                </p>
              </section>

              


              <section className="py-10">
                <h2 className="rounded bg-sky-50 px-4 py-2 text-lg font-semibold text-red-700">
                  Ready to Get Clarity on Your AI/ML Career?
                </h2>

                <p className="mt-4 max-w-5xl text-20 text-zinc-700 leading-relaxed"></p>
                  
                  <ul className="mt-6 pl-6 text-xl text-zinc-700">
                    <li>Stop guessing.</li>
                    <li>Start building with the right roadmap.</li>
                  </ul>
                

                <ul className="mt-6 list-disc space-y-3 pl-6 text-20 text-zinc-700">
                  <li>Get structured clarity on AI Engineer vs ML Engineer roles — and move forward with confidence.</li>
                </ul>

            

                <h1 className="mt-4  max-w-5xl text-xl font-extrabold text-zinc-700 text-center mx-auto">
                  Join this free live webinar.
                  <span className="text-[#AD1612]">
                    {" "}Register Now
                  </span>
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
                    {registeredCount} Users registered
                  </span>
                </div>


                

                <form onSubmit={onSubmit} className="space-y-4">

                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-16 rounded bg-[#AD1612]" />
                    <span className="h-1.5 w-16 rounded bg-rose-100" />
                    <span className="h-1.5 w-16 rounded bg-rose-100" />
                    <span className="h-1.5 w-16 rounded bg-rose-100" />
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
                        onChange={onChange}
                        
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
                    disabled={loading}
                    className="w-full rounded-lg px-5 py-2.5 text-sm font-semibold text-white bg-[#AD1612] disabled:opacity-70"
                  >
                    {loading ? "Submitting…" : submitLabel}
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

