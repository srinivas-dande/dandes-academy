import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TestimonialsFull from '../../components/TestimonialsFull';

export const metadata = {
  title: "Testimonials Full",
  description: "Testimonials from students of Dandes Academy.",
  alternates: { canonical: "/testimonials-full" },
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <TestimonialsFull />
      <Footer />
    </main>
  );
}
