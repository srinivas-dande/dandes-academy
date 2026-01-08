
import Header from '../../components/Header';
import ClassVideos from '../../components/ClassVideos';
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
      <ClassVideos />
      <Footer />
    </main>
  );
}
