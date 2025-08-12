"use client";

import { useProjectStore } from "@/store/projectStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";

const TeamMembers = () => {
  const { projectId } = useProjectStore() as { projectId: string };
  type Teammate = { email: string; _id: string };
  const [teamMates, setTeamMates] = useState<Teammate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const[selectedUser,setSelectedUser]=useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/teammates?projectId=${projectId}`);
        setTeamMates(res.data.result);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [projectId]);

  const handleRemoveUser = async() => {

    const res= await axios.post("/api/teammates",{projectId,userId:selectedUser})
    console.log("response",res);
    
    setShowModal(false)
    setSelectedUser("")
  };
  return (
    <div className="absolute z-50 right-0 mt-2 w-80 max-h-[400px] overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4">
      <input
        type="text"
        placeholder="Search by email"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />

      <ul className="space-y-3">
        {teamMates.map((teammate) => (
          <li
            key={teammate.email}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm text-gray-800 dark:text-white">
              {teammate.email}
            </span>
            <button
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors"
              onClick={() => {
                setShowModal(true) 
                setSelectedUser(teammate._id)}} 
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRemoveUser}
        title="Remove Confirmation"
        message="Are you sure you want to remove this user?"
      />
    </div>
  );
};

export default TeamMembers;
