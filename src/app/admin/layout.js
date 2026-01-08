import Header from "../../components/admin/Header";
import Footer from "../../components/admin/Footer";
import MySidebar from "../../components/admin/MySidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Same Header */}
      <Header />

      <div className="flex flex-1">
        
        {/* Same Sidebar */}
        <MySidebar />

        <main className="flex-1 p-6 text-gray-900">
          {children}
        </main>
      </div>

      {/* Same Footer */}
      <Footer />
    </div>
  );
}
