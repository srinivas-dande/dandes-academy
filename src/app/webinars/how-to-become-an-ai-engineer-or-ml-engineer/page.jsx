import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import WebinarBody from "./WebinarBody";

export const metadata = {
  title: "How to Become an AI Engineer or ML Engineer | Free Webinar",
  description:
    "Free live webinar: AI Engineer vs ML Engineer — responsibilities, skills to learn, and step-by-step career roadmap.",
  alternates: {
    canonical: "/webinars/how-to-become-an-ai-engineer-or-ml-engineer",
  },
};

export default function WebinarPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <WebinarBody />
      <Footer />
    </main>
  );
}
