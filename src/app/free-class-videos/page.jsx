
import Header from '../../components/Header';
import DemoVideos from '../../components/DemoVideos';
import Footer from '../../components/Footer';

export const metadata = {
  title: "Free Class Videos",
  description: "Free Class Videos",
  alternates: { canonical: "/free-class-videos" },
};


export default function FreeClassVideos() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <DemoVideos />
      <Footer />
    </main>
  );
}
