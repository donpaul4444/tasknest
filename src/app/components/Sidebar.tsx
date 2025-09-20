
import React from 'react'
import { Session } from "next-auth";
import Link from 'next/link';

interface SidebarProps {
  session: Session | null | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({session,setShowModal}:SidebarProps) => {
  return (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-black shadow-lg border border-gray-200 dark:border-gray-700 z-50 rounded-md">
                <div className="p-4 space-y-4">
                  <p className="text-base font-semibold">
                    Welcome, {session?.user?.name}
                  </p>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="w-full text-left px-4 py-2 rounded-md text-sm hover:bg-red-100 dark:hover:bg-red-800 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
  )
}

export default Sidebar
