"use client";

import AddTeamMate from "@/app/components/AddTeamMate";
import TeamMembers from "@/app/components/TeamMembers";
import { UserPlus, Users } from "lucide-react";
import { useState } from "react";

export default function ProjectBoardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Project Board
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Portfolio Website
          </p>
        </div>
        <div className="flex gap-5 justify-end">
          <button className="bg-red-700 text-white dark:bg-white dark:text-black px-2 rounded-lg hover:opacity-90 transition">
            + Create
          </button>
          <div className="flex items-center gap-3">
            {/* View Teammates Button */}
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <Users size={18} />
                <span className="hidden sm:inline">Team Members</span>
              </button>
              {isOpen && <TeamMembers />}
            </div>

            {/* Add Teammate Button */}
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                onClick={() => setIsOpenAdd((prev) => !prev)}
              >
                <UserPlus size={18} />
                <span className="hidden sm:inline">Add Teammate</span>
              </button>
              {isOpenAdd && <AddTeamMate />}
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="overflow-x-auto">
        <div className="flex flex-col lg:flex-row  gap-4 lg:min-w-full">
          {["To Do", "In Progress", "Review", "Done"].map((column) => (
            <div
              key={column}
              className="flex-1  h-[400px] lg:mt-0 mt-5 w-full  bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col lg:max-h-[70vh] lg:h-screen "
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {column}
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-sm text-gray-700 dark:text-gray-100">
                  Sample Task
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-sm text-gray-700 dark:text-gray-100">
                  Another Task
                </div>
                {/* Add more sample tasks if needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
