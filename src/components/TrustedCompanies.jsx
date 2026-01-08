export default function TrustedCompanies() {
  const companies = [
    "Google",
    "Amazon",
    "Microsoft",
    "Meta",
    "Netflix",
    "Uber",
    "Adobe",
    "Oracle",
    "Flipkart",
    "Paytm",
  ];

  return (
    <section className="bg-white py-10 border-y border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-gray-700 text-lg font-semibold mb-6">
          Our Learners Work At
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80">
          {companies.map((company) => (
            <div
              key={company}
              className="text-gray-600 font-medium text-sm sm:text-base hover:text-blue-700 transition"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
