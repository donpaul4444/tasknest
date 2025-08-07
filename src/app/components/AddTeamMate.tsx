import { useProjectStore } from "@/store/projectStore";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AddTeamMate = () => {
  const { projectId } = useProjectStore() as { projectId: string };
  const [nonMembers, setNonMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/addteammates?projectId=${projectId}`);

        console.log(res.data.result);
        setNonMembers(res.data.result);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [projectId]);

  const handleSendInvite = async (receiverId: string) => {
    try {
      const res = await axios.post("/api/notification",{receiverId,projectId});
      console.log("response", res);
    } catch (error) {
      console.log("error",error);
      
    }
  };
  return (
    <div className="absolute z-50 right-0 mt-2 w-80 max-h-[400px] overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4">
      <input
        type="text"
        placeholder="Search by email"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />

      <ul className="space-y-3">
        {nonMembers.map(({ _id, email }) => (
          <li
            key={_id}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm text-gray-800 dark:text-white">
              {email}
            </span>
            <button
              className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors"
              onClick={() => handleSendInvite(_id)}
            >
              Send
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTeamMate;
