"use client";

import { useState } from "react";

export default function FeedbackForm({ onSuccess }) {
const [formData, setFormData] = useState({
fullName: "",
email: "",
whatsappNumber: "",
experienceLevel: "",
valuableTopics: [],
targetRole: "",
biggestChallenges: [],
programInterest: "",
contentClarity: "",
webinarRating: "",
recommendation: "",
extraFeedback: "",
});

const [rating, setRating] = useState(0);
const [valuableTopicsError, setValuableTopicsError] = useState("");
const [challengesError, setChallengesError] = useState("");
const [ratingError, setRatingError] = useState("");

const handleChange = (field, value) => {
setFormData({ ...formData, [field]: value });
};

const handleCheckbox = (field, value) => {
setFormData((prev) => ({
...prev,
[field]: prev[field].includes(value)
? prev[field].filter((v) => v !== value)
: [...prev[field], value],
}));
};

const handleSubmit = async (e) => {
e.preventDefault();


let hasError = false;

if (formData.valuableTopics.length === 0) {
  setValuableTopicsError("Please select at least one valuable topic.");
  hasError = true;
} else {
  setValuableTopicsError("");
}

if (formData.biggestChallenges.length === 0) {
  setChallengesError("Please select at least one challenge.");
  hasError = true;
} else {
  setChallengesError("");
}

if (rating === 0) {
  setRatingError("Please select a star rating.");
  hasError = true;
} else {
  setRatingError("");
}

if (hasError) return;

const res = await fetch("/da-api/webinar-feedback", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

if (res.ok) {
  onSuccess();
} else {
  alert("Submission failed. Try again.");
}


};

return ( <form
   onSubmit={handleSubmit}
   className="max-w-3xl mx-auto p-6 space-y-6 text-gray-900"
 >


  {/* Full Name */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      Full Name <span className="text-red-500">*</span>
    </label>

    <input
      required
      className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      onChange={(e) => handleChange("fullName", e.target.value)}
    />
  </div>

  {/* Email */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      Email ID <span className="text-red-500">*</span>
    </label>

    <input
      type="email"
      required
      className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      onChange={(e) => handleChange("email", e.target.value)}
    />
  </div>

  {/* WhatsApp */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      WhatsApp Number <span className="text-red-500">*</span>
    </label>

    <input
      type="tel"
      required
      inputMode="numeric"
      pattern="[0-9]{10}"
      maxLength={10}
      placeholder="Enter 10-digit WhatsApp number"
      className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      onChange={(e) => handleChange("whatsappNumber", e.target.value)}
    />
  </div>

  {/* Q4 Experience */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      What is your current experience level? <span className="text-red-500">*</span>
    </label>

    <div className="flex text-lg flex-wrap gap-x-6 gap-y-2">
      {["Student / Fresher", "1–5 years", "5–10 years", "10+ years"].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input
            type="radio"
            name="experienceLevel"
            required
            className="scale-150 cursor-pointer"
            onChange={() => handleChange("experienceLevel", v)}
          />
          {v}
        </label>
      ))}
    </div>
  </div>

  {/* Q5 Valuable Topics */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      Which topic did you find most valuable? <span className="text-red-500">*</span>
    </label>

    <div className=" text-lg space-y-2">
      {[
        "AI Engineer vs ML Engineer comparison",
        "The 6-Step AI/ML Roadmap",
        "Career paths based on experience level",
        "Salary expectations",
        "Common mistakes to avoid",
      ].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="scale-150 cursor-pointer"
            onChange={() => handleCheckbox("valuableTopics", v)}
          />
          {v}
        </label>
      ))}
    </div>
    {valuableTopicsError && (
      <p className="text-red-500 text-sm mt-1">{valuableTopicsError}</p>
    )}
  </div>

  {/* Q6 Target Role */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      Which role are you planning to target? <span className="text-red-500">*</span>
    </label>

    <div className=" text-lg space-y-2">
      {["AI Engineer", "ML Engineer", "Not Sure Yet"].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input
            type="radio"
            name="targetRole"
            required
            className="scale-150 cursor-pointer"
            onChange={() => handleChange("targetRole", v)}
          />
          {v}
        </label>
      ))}
    </div>
  </div>

  {/* Q7 Challenges */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      What is your biggest challenge currently? <span className="text-red-500">*</span>
    </label>

    <div className="text-lg space-y-2">
      {[
        "No proper roadmap",
        "Weak in programming",
        "Weak in math",
        "No real-time projects",
        "No interview guidance",
        "Confused between roles",
      ].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="scale-150 cursor-pointer"
            onChange={() => handleCheckbox("biggestChallenges", v)}
          />
          {v}
        </label>
      ))}
    </div>
    {challengesError && (
      <p className="text-red-500 text-sm mt-1">{challengesError}</p>
    )}
  </div>

  {/* Q8 Program Interest */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      Are you interested in joining Dandes Academy AI/ML Program? <span className="text-red-500">*</span>
    </label>

    <div className="text-lg space-y-2">
      {[
        "Yes – I am ready to enroll",
        "Yes – Need more details",
        "Maybe – Need career counseling call",
        "Not Now",
      ].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input
            type="radio"
            name="programInterest"
            required
            className="scale-150 cursor-pointer"
            onChange={() => handleChange("programInterest", v)}
          />
          {v}
        </label>
      ))}
    </div>
  </div>

  {/* Q9 Clarity */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      How clear and relevant was the content presented? <span className="text-red-500">*</span>
    </label>

    <div className="text-lg space-y-2">
      {["Very Clear", "Mostly Clear", "Somewhat Clear", "Not Clear"].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input
            type="radio"
            name="contentClarity"
            required
            className="scale-150 cursor-pointer"
            onChange={() => handleChange("contentClarity", v)}
          />
          {v}
        </label>
      ))}
    </div>
  </div>

  {/* Star Rating */}
  <div>
    <label className="block mb-2 text-2xl font-semibold text-gray-800">
      How would you rate the overall webinar experience? <span className="text-red-500">*</span>
    </label>

    <div className=" text-3xl flex gap-2  cursor-pointer">
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          onClick={() => {
            setRating(star);
            handleChange("webinarRating", star);
          }}
          className={`transition ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
    {ratingError && (
      <p className="text-red-500 text-sm mt-1">{ratingError}</p>
    )}


  </div>

  {/* Recommend */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      Would you recommend this webinar to a friend or colleague? <span className="text-red-500">*</span>
    </label>

    <div className="text-lg space-y-2">
      {["Definitely Yes", "Maybe", "No"].map((v) => (
        <label key={v} className="flex items-center gap-2">
          <input
            type="radio"
            name="recommendation"
            required
            className="scale-150 cursor-pointer"
            onChange={() => handleChange("recommendation", v)}
          />
          {v}
        </label>
      ))}
    </div>
  </div>

  {/* Feedback */}
  <div>
    <label className="block mb-1 text-2xl font-semibold text-gray-800">
      Any other feedback, questions, or thoughts? <span className="text-red-500">*</span>
    </label>

    <textarea
      required
      rows={4}
      className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      onChange={(e) => handleChange("extraFeedback", e.target.value)}
    />
  </div>

  <button
    type="submit"
    className="w-full text-white py-3 rounded font-semibold bg-[#AD1612]"
  >
    Submit Feedback
  </button>

</form>


);
}
