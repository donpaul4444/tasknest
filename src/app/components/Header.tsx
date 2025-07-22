import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          TaskNest
        </Link>
        <nav className="space-x-6">
          <Link href="/login" className="text-gray-700 hover:text-blue-600">Loginnnn</Link>
          <Link href="/register" className="text-gray-700 hover:text-blue-600">Registerrrrrr</Link>
        </nav>
      </div>
    </header>
  );
}
