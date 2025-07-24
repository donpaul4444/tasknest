import "../globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full  sm:px-3 lg:px-10  mx-auto border shadow-lg">
        {children}
      </main>
      <Footer />
    </div>
  );
}
