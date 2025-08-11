import React from "react";
type NotificationType = {
  _id: string;
  type: "invite" | "task";
  createdAt: string;
  sender?: { email: string };
  project?: { _id: string; name: string };
};

interface props {
  notification: NotificationType;
    onAccept: () => void;
  onDecline: () => void;
}

const NotificationItem = ({ notification,onAccept,onDecline }: props) => {
  return (
    <div className="absolute right-0 mt-4 w-80 max-h-96 overflow-y-auto z-50 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {notification?.type === "invite" && (
        <div className="p-2 border-b border-gray-200">
          <p className="text-sm text-gray-800 dark:text-gray-200">
            Hey{" "}
            <span className="font-medium">{notification.sender?.email}</span>{" "}
            wants to join their project{" "}
            <span className="font-semibold">{notification.project?.name}</span>.
          </p>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded" onClick={onAccept}>
              Accept
            </button>
            <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded" onClick={onDecline}>
              Decline
            </button>
          </div>
        </div>
      )}
      {notification.type === "task" && (
        <p className="text-sm text-gray-800 dark:text-gray-200">
          ✅ A new task update in{" "}
          <span className="font-semibold">{notification.project?.name}</span>.
        </p>
      )}
    </div>
  );
};

export default NotificationItem;
