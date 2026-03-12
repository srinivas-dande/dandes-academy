import MiniHeader from "@/components/MiniHeader";
import Footer from "@/components/Footer";
import WebinarFeedbackBody from "./WebinarFeedbackBody";

export const metadata = {
  title: "Webinar Feedback | Dandes Academy",
  description:
    "Share your feedback for the AI Engineer vs ML Engineer webinar.",
  alternates: {
    canonical: "/feedback",
  },
};

export default function WebinarFeedbackPage() {
  return (
    <main className="min-h-screen bg-white">
      <MiniHeader />
      <WebinarFeedbackBody />
      <Footer />
    </main>
  );
}
