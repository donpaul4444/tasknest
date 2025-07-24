export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600  border-t py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-1">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-700">
            © {new Date().getFullYear()} TaskNest. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-1">
          <a href="#" className="hover:text-black transition px-2">About</a>
          <a href="#" className="hover:text-black transition px-2">Admin</a>
          <p className="text-gray-500 px-2">donpaul4444@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
