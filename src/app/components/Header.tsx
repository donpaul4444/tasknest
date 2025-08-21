"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { signOut, useSession } from "next-auth/react";
import ConfirmModal from "./ConfirmModal";
import { Bell, ChevronDown, User } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import NotificationItem from "./NotificationItem";
import { useUIStore } from "@/store/uiStore";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";

interface NotificationType {
  _id: string;
  type: "invite" | "task" | "accept" | "decline";
  createdAt: string;
}

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { data: session, status } = useSession();

  const { openDropdownId, setOpenDropdownId } = useUIStore();

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  useEffect(() => {
    const getNotification = async () => {
      const res = await axios.get("/api/notification");
      setNotifications(res.data.notifications);
    };
    getNotification();
  }, []);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    setTheme(nextChecked ? "dark" : "light");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleAction = async (notificationId: string, action: string) => {
    try {
      const res = await axios.post("/api/notification/action", {
        notificationId,
        action,
      });

      setNotifications((prev) =>
        prev.filter((notif) => notif._id !== notificationId)
      );
      if (res.data.success) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  const handleIsRead = async (notificationId: string) => {
    try {
      await axios.post("/api/notification/isread", {
        notificationId,
      });
      setNotifications((prev) =>
        prev.filter((notif) => notif._id !== notificationId)
      );
    } catch (error) {
      console.error("Error performing action:", error);
    }
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
          <div className="relative" data-dropdown-id="notificationbar">
            <button
              onClick={() => {
                toggleDropdown("notificationbar");
              }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition relative"
            >
              <Bell className="w-5 h-5" />
              {notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
            {openDropdownId === "notificationbar" && (
              <NotificationItem
                notifications={notifications}
                handleAction={handleAction}
                handleIsRead={handleIsRead}
              />
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" data-dropdown-id="sidebar">
            {status === "authenticated" && (
              <button
                onClick={() => {
                  toggleDropdown("sidebar");
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
            {openDropdownId === "sidebar" && (
              <Sidebar setShowModal={setShowModal} session={session} />
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
