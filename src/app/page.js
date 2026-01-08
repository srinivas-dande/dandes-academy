import Header from '../components/Header';
import Hero from '../components/Hero';
import WhyDandesAcademy from '../components/WhyDandesAcademy';
import Instructor from '../components/Instructor';
import Testimonials from '../components/Testimonials';
import LearningJourney from '../components/LearningJourney';
import UpcomingBatches from '../components/UpcomingBatches';
import LeadCapture from '../components/DownloadBroucher';
import FAQs from '../components/FAQs';
import Footer from '../components/Footer';
import DetailedSyllabus from '@/components/DetailedSyllabus';
import ToolsTechnologies from '@/components/ToolsTechnologies';

// inside your home page component (below return start)
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Dandes Academy",
      url: "https://dandesacademy.com",
      sameAs: [
        "https://www.youtube.com/@DandesAcademy",
        "https://www.facebook.com/DandesAcademy",
        "https://www.instagram.com/DandesAcademy",
        "https://www.linkedin.com/in/srinivasdande/",
      ],
    }),
  }}
/>


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WhyDandesAcademy />
      <LearningJourney />
      <ToolsTechnologies />
      <DetailedSyllabus />
      <Instructor />
      <Testimonials />
      <LeadCapture />
      <FAQs />
      <Footer />

    </main>
  );
}

