"use client";

import { X } from "lucide-react";

type TaskDetailModalProps = {
  task: {
    _id?: string;
    title: string;
    description: string;
    assignedTo: { email: string } | null;
    priority: string;
    status: string;
  };
  onClose:()=>void
};
export default function TaskDetailModal({ task ,onClose}: TaskDetailModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">{task.title}</h2>
        <p className="text-gray-700 dark:text-gray-200 mb-3">{task.description}</p>

        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Assigned To:</strong> {task.assignedTo?.email || "Unassigned"}</p>
        </div>
      </div>
    </div>
  );
}
