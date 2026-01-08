import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* a) Brand */}
          <div>
            <h4 className="text-xl font-extrabold text-white">Dandes Academy</h4>
         <p className="mt-3 text-sm text-gray-400 leading-relaxed">
  Industry-focused training in <span className="text-gray-200">AI/ML</span> designed for real-world applications.
  <br />
  Build strong foundations, work on hands-on projects,
    and become industry-ready.
</p>

          </div>

         {/* b) Useful Links */}
<div>
  <h5 className="text-sm font-semibold text-white">Useful Links</h5>
  <ul className="mt-3 space-y-2 text-sm">

    {/* Scroll to FAQ section on same page */}
    <li>
        <Link
        href="/faqs"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white focus:outline-none"
      >
         Frequently Asked Questions
      </Link>
    </li>

    {/* Open Terms in new page */}
    <li>
      <Link
        href="/terms"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white focus:outline-none"
      >
        Terms and Conditions
      </Link>
    </li>

    {/* Open Privacy in new page */}
    <li>
      <Link
        href="/privacy"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white focus:outline-none"
      >
        Privacy Policy
      </Link>
    </li>

    {/* Open Privacy in new page */}
    <li>
      <Link
        href="/free-class-videos"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white focus:outline-none"
      >
        Free Class Videos
      </Link>
    </li>

  </ul>
</div>


        {/* c) Social Media */}
<div>
  <h5 className="text-sm font-semibold text-white">Social Media</h5>
  <ul className="mt-3 space-y-2 text-sm">
    <li>
      <a
        href="https://www.youtube.com/@DandesAcademy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white"
      >
        YouTube
      </a>
    </li>

    <li>
      <a
        href="https://www.linkedin.com/in/srinivasdande/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white"
      >
        LinkedIn
      </a>
    </li>

    <li>
      <a
        href="https://www.facebook.com/DandesAcademy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white"
      >
        Facebook
      </a>
    </li>
    
    <li>
      <a
        href="https://www.instagram.com/DandesAcademy"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white focus:text-white"
      >
        Instagram
      </a>
    </li>
  </ul>
</div>


          {/* d) Contact */}
          <div>
            <h5 className="text-sm font-semibold text-white">Contact</h5>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:hello@dandesacademy.com"
                  className="hover:text-white focus:text-white"
                >
                  hello@dandesacademy.com
                </a>
              </li>
              <li>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/917090366699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white focus:text-white"
                >
                  +91 7090366699
                </a>
              </li>
              <li>
                 Phone:{" "}
  <a
    href="tel:+917090366699"
    className="hover:text-white focus:text-white"
  >
    +91 7090366699
  </a>
</li>
              <li>Location: Bangalore, India</li>
            </ul>
          </div>
        </div>

       <div className="mt-10 border-t border-gray-800 pt-6 text-center">
  <p className="text-sm sm:text-base font-medium text-gray-300">
    © {new Date().getFullYear()}{" "}
    <span className="text-white font-semibold">Dandes Academy</span>. All rights reserved.
  </p>
</div>

      </div>

      {/* brand accent bar */}
      <div className="h-1 w-full bg-[#AD1612]" />
    </footer>
  );
}
