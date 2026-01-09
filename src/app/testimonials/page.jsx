import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';

export const metadata = {
  title: "Testimonoals",
  description: "Testimonoals from Students.",
  alternates: { canonical: "/testimonials" },
};


export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
     <Testimonials />
      <Footer />
    </main>
  );
}
