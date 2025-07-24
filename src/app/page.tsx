import { FcGoogle } from "react-icons/fc";

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
        <form action="/api/auth/signin" method="POST">
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded-md "
            >
              <FcGoogle size={24} />
              <span className="text-gray-800 font-medium text-sm">
                Continue with Google
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
