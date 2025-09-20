"use client"
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600  py-6 px-4 dark:bg-black">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-1">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-700 dark:text-white">
            © {new Date().getFullYear()} TaskNest. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-1">
          <p className="text-gray-500 px-2 dark:text-white">About</p>
          <p className="text-gray-500 px-2 dark:text-white">donpaul4444@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
