"use client";
import { useProjectStore } from "@/store/projectStore";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData: {
    title: string;
    description: string;
    assignedTo: string;
    priority: string;
  };
  setTaskData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  teamMates:{_id:string; email:string}[]
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  taskData,
  setTaskData,
  onSubmit,
  teamMates
}: CreateTaskModalProps) => {

 

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev: any) => ({ ...prev, [name]: value }));
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center border">
      <div className="bg-white w-full max-w-sm  sm:max-w-md rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold">Create Task</h2>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            className="w-full border rounded-lg p-2 mt-1"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border rounded-lg p-2 mt-1"
            rows={3}
            value={taskData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Assign To</label>
          <div className="relative">
            <input
              name="assignedTo"
              type="text"
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="email id"
              value={taskData.assignedTo}
              onChange={handleChange}
              autoComplete="off"  

            />
            {teamMates.length > 0 && taskData.assignedTo !== "" && (
              <ul className="absolute z-10 bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto w-full">
                {teamMates
                  .filter((mate: any) =>
                    mate.email
                      .toLowerCase()
                      .includes(taskData.assignedTo.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((mate: any) => (
                    <li
                      key={mate._id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        setTaskData((prev) => ({
                          ...prev,
                          assignedTo: mate.email,
                        }))
                      }
                    >
            
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select
            name="priority"
            className="w-full border rounded-lg p-2 mt-1"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-3 justify-end mt-4">
          <button
            onClick={() => {
              onClose();
              setTaskData({
                title: "",
                description: "",
                assignedTo: "",
                priority: "medium",
              });
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
