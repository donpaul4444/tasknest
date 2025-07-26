"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { signOut, useSession } from "next-auth/react";
import ConfirmModal from "./ConfirmModal";
import { Menu, X, User } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    setTheme(nextChecked ? "dark" : "light");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="w-full bg-white dark:bg-black dark:text-white shadow-md fixed top-0 left-0 z-40">
  <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
    {/* Logo */}
    <Link
      href="/"
      className="text-2xl font-bold text-blue-600 dark:text-blue-400"
    >
      TaskNest
    </Link>

    {/* Right Section */}
    <div className="flex items-center gap-4 relative">
      {/* Theme Toggle */}
      <div className="pr-10 flex items-center">
        <Switch
          onChange={handleChange}
          checked={checked}
          offColor="#000"
          onColor="#fff"
          offHandleColor="#fff"
          onHandleColor="#000"
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={40}
        />
      </div>

      {/* Profile Image / Icon */}
      {status === "authenticated" &&
        (session.user?.image ? (
          <Image
            src={session.user.image}
            alt="User"
            width={32}
            height={32}
            className="rounded-full border border-gray-300 dark:border-gray-600"
          />
        ) : (
          <User className="w-6 h-6" />
        ))}

      {/* Hamburger Button & Dropdown */}
      <div className="relative">
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="ml-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
>
  <Menu
    className={`w-6 h-6 transform transition-transform duration-300 ${
      menuOpen ? "rotate-90" : "rotate-0"
    }`}
  />
</button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className={`absolute right-0 mt-2 w-64 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-700 z-50 rounded-md transition-transform duration-200`}
          >
            <div className="p-4 space-y-4">
              {status === "authenticated" && (
                <p className="text-base font-semibold">
                   Welcome, {session.user?.name}
                </p>
              )}
              <Link
                href="/project"
                className="block bg-white dark:bg-black"
              >
                 Home
              </Link>
              <button
                className=" bg-white dark:bg-black"
                onClick={() => {
                  setShowModal(true);
                  setMenuOpen(false);
                }}
              >
                 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Logout Modal */}
  <ConfirmModal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    onConfirm={handleLogout}
    title="Logout Confirmation"
    message="Are you sure you want to logout?"
  />
</header>

  );
}
