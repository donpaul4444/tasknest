// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <section className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center space-y-6 max-w-lg w-full">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Welcome to <span className="text-indigo-600">TaskNest</span>
        </h1>
        <p className="text-lg text-gray-600">
          Organize your work and boost your productivity with ease.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-md transition-all duration-200"
          >
            Login
          </a>
          <a
            href="/signup"
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-100 px-6 py-2 rounded-md text-sm font-medium shadow-sm transition-all duration-200"
          >
            Sign Up
          </a>
        </div>
      </section>
    </main>
  );
}
