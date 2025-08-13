import { X } from "lucide-react";
import React from "react";

type NotificationType = {
  _id: string;
  type: "invite" | "task" | "accept" | "decline";
  createdAt: string;
  sender?: { email: string };
  project?: { _id: string; name: string };
};

interface Props {
  notifications: NotificationType[];
  handleAction: (id: string, action: string) => void;
  handleIsRead: (id: string) => void;
}

const NotificationItem = ({
  notifications,
  handleAction,
  handleIsRead,
}: Props) => {
  return (
    <div className="absolute right-0 mt-4 w-80 h-96 overflow-y-auto z-50 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {notifications.length === 0 ? (
        <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
          No new notifications
        </p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className="p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
          >
            {notification.type === "invite" && (
              <>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  Hey{" "}
                  <span className="font-medium">
                    {notification.sender?.email}
                  </span>{" "}
                  wants to join their project{" "}
                  <span className="font-semibold">
                    {notification.project?.name}
                  </span>
                  .
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded"
                    onClick={() => handleAction(notification._id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                    onClick={() => handleAction(notification._id, "decline")}
                  >
                    Decline
                  </button>
                </div>
              </>
            )}

            {notification.type === "task" && (
              <div>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  ✅ A new task update in{" "}
                  <span className="font-semibold">
                    {notification.project?.name}
                  </span>
                  .
                </p>
                <button onClick={() => handleIsRead(notification._id)}>
                  <X />
                </button>
              </div>
            )}

            {notification.type === "accept" && (
              <div className="flex gap-2 justify-between">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">
                    {notification.sender?.email}
                  </span>{" "} has accepted your invitation to join the project{" "}
                  <span className="font-semibold">
              {notification.project?.name}
                  </span>
                  
                </p>
                <button onClick={() => handleIsRead(notification._id)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {notification.type === "decline" && (
              <div className="flex gap-2 justify-between items-start">
                 <span className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">
                    {notification.sender?.email}
                  </span>{" "}
                  has declined your invitation to join the project{" "}
                  <span className="font-semibold">
                    {notification.project?.name}
                  </span>
                </p>

                <button onClick={() => handleIsRead(notification._id)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationItem;
