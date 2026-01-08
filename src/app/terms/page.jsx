import Header from '../../components/Header';
import Terms from '../../components/TermsAndConditions';
import Footer from '../../components/Footer';

export const metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for Dandes Academy programs and services.",
  alternates: { canonical: "/terms" },
};


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Terms/>
      <Footer />

    </main>
  );
}

