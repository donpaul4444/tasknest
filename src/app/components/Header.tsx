"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { signOut, useSession } from "next-auth/react";
import ConfirmModal from "./ConfirmModal";


export default function Header() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);
console.log("status" ,"man",status, session)


  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    setTheme(nextChecked ? "dark" : "light");
  };

  const handleLogout = () => {
signOut({callbackUrl:'/'})
  };
  return (
    <header className="w-full   dark:bg-black dark:text-white shadow-md ">
      <div className="px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-3xl font-bold ">
          TaskNest
        </Link>
        <nav className="space-x-6 flex items-center">
          <button
            className="text-blue-600 dark:text-blue-400 font-medium "
            onClick={() => setShowModal(true)}
          >
            LogOut
          </button>
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

          <ConfirmModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleLogout}
            title="Logout Confirmation"
            message="Are you sure you want to logout?"
          />
          <div>
            {status === "authenticated" ? (
              <p>Welcome, {session?.user?.name}</p>
            ) : (
              <p>You are not logged in</p>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
