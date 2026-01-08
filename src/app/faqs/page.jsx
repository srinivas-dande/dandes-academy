import Header from '../../components/Header';
import FAQs from '../../components/FAQs';
import Footer from '../../components/Footer';

export const metadata = {
  title: "FAQs",
  description: "Frequently asked questions about Dandes Academy AI/ML program.",
  alternates: { canonical: "/faq" },
};


export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <FAQs />
      <Footer />
    </main>
  );
}
