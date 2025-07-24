import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full  bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-3xl font-bold text-blue-600">
          TaskNest
        </Link>
        <nav className="space-x-6">
          <Link href="/login" className="text-bold hover:text-blue-600">Logout</Link>

        </nav>
      </div>
    </header>
  );
}
