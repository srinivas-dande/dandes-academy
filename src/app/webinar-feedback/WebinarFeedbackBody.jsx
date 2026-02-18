"use client";

import { useState } from "react";
import FeedbackForm from "./feedback";

export default function WebinarFeedbackBody() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-12 px-4">
      {!submitted ? (
        <>
            
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center leading-tight text-gray-900">
            Webinar Feedback Form
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Your feedback helps us improve future sessions
          </p>

          <FeedbackForm onSuccess={() => setSubmitted(true)} />
        </>
      ) : (
        <div className="max-w-xl mx-auto text-center py-20">
          <h2 className="text-3xl font-bold text-green-600">
            🎉 Successfully Registered!
          </h2>
          <p className="mt-3 text-gray-600">
            Thank you for your valuable feedback.  
            Our team will reach out to you if required.
          </p>
        </div>
      )}
    </section>
  );
}
