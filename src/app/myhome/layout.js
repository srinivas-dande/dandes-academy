import Header from "../../components/myhome/Header";
import Footer from "../../components/myhome/Footer";
import MySidebar from "../../components/myhome/MySidebar";

export default function MyHomeLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Header />

      {/* FIXED: Add flex-grow to push footer down */}
      <div className="flex flex-1">

        <MySidebar />

        {/* this section must grow */}
        <main className="flex-1 p-6 text-gray-900">
          {children}
        </main>
      </div>

      <Footer />   {/* Always stays at the bottom */}
    </div>
  );
}
