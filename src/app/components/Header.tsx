"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { signOut, useSession } from "next-auth/react";
import ConfirmModal from "./ConfirmModal";
import { Bell, ChevronDown, User } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
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
          <div className="pr-4 flex items-center">
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

          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setMenuOpen(false);
              }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              <Bell className="w-5 h-5" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 z-50 rounded-md">
                <div className="p-4 space-y-2">
                  <div className="text-sm font-semibold mb-2">Notifications</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    📌 You have 2 pending invites.
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    ✅ Project "Design UI" was completed.
                  </div>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            {status === "authenticated" && (
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full border border-gray-300 dark:border-gray-600"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
                <ChevronDown className="w-4 h-4" />
              </button>
            )}

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-700 z-50 rounded-md">
                <div className="p-4 space-y-4">
                  <p className="text-base font-semibold">
                    Welcome, {session?.user?.name}
                  </p>
                  <Link
                    href="/project"
                    className="block px-4 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                     Home
                  </Link>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md text-sm hover:bg-red-100 dark:hover:bg-red-800 text-red-600"
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
