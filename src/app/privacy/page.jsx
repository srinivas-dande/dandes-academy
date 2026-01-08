
import Header from '../../components/Header';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import Footer from '../../components/Footer';

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy of Dandes Academy and how we handle your data.",
  alternates: { canonical: "/privacy" },
};


export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}
