"use client";
import { useState } from "react";
import FeedbackForm from "./feedback";

export default function WebinarFeedbackBody() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-12 px-4">
      {!submitted ? (
        <>
            
          <h1 className="text-center sm:text-4xl font-extrabold text-gray-900 mb-5 leading-snug">
            AI Career Switch
 
            <span className="text-[#124394]">
              {" "} Blueprint
            </span>
          </h1>
          <p className="text-center text-3xl text-gray-600 mb-8">
            Webinar Feedback Form 
          </p>

          <FeedbackForm onSuccess={() => setSubmitted(true)} />
        </>
      ) : (
        <div className="max-w-xl mx-auto text-center py-20">
          <h1 className="text-center sm:text-4xl font-extrabold text-gray-900 mb-5 leading-snug">
            AI Career Switch
 
            <span className="text-[#124394]">
              {" "} Blueprint
            </span>
          </h1>

          <h2 className="text-3xl font-bold text-green-600">
            🎉 Your FeedBack Form Successfully Submited!
          </h2>
          <p className="mt-3 text-gray-600">
            Thank you for your valuable feedback.  
            
          </p>
        </div>
      )}
    </section>
  );
}
