export default function TermsAndConditions() {
  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Welcome to <strong>Dandes Academy</strong>. By accessing or enrolling in our
          courses, programs, webinars, or services, you agree to comply with and be
          bound by the following terms and conditions. Please read them carefully.
        </p>

        {/* Section 1 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          1. Course Enrollment & Access
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Enrollment in any Dandes Academy program grants access only to the
          materials, sessions, and resources specified for that course. Course
          content, schedules, and delivery methods may be updated to improve
          learning outcomes.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          2. Payments & Refund Policy
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All payments must be made in full or as per the agreed installment plan.
          We offer a <strong>30-day refund policy</strong> from the date of enrollment,
          provided the refund request meets our eligibility criteria.
        </p>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          3. Use of Course Content
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All course materials, including videos, assignments, documents, and
          recordings, are the intellectual property of Dandes Academy. Sharing,
          reproducing, or distributing content without written permission is
          strictly prohibited.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          4. Learner Responsibilities
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Learners are expected to maintain respectful conduct during live sessions,
          forums, and interactions. Any misuse of the platform or inappropriate
          behavior may result in suspension or termination of access.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          5. Career Support Disclaimer
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          While Dandes Academy provides career guidance, interview preparation, and
          placement assistance, we do not guarantee job placement. Career outcomes
          depend on individual effort, skill development, and market conditions.
        </p>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          6. Changes to Terms
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Dandes Academy reserves the right to update or modify these terms at any
          time. Continued use of our services after changes indicates acceptance of
          the updated terms.
        </p>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          7. Contact Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          For any questions regarding these terms, please contact us at{" "}
          <a
            href="mailto:hello@dandesacademy.com"
            className="text-[#AD1612] font-medium hover:underline"
          >
            hello@dandesacademy.com
          </a>.
        </p>

      </div>
    </section>
  );
}
