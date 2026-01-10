import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TestimonialsFull from '../../components/TestimonialsFull';

export const metadata = {
  title: "TestimonoalsFull",
  description: "Testimonoals from Students.",
  alternates: { canonical: "/testimonialsfull" },
};


export default function TestimonialsFullPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
     <TestimonialsFull />
      <Footer />
    </main>
  );
}
