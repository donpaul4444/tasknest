"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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
  teamMates: { _id: string; email: string }[];
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  taskData,
  setTaskData,
  onSubmit,
  teamMates,
}: CreateTaskModalProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    const formErrors = { title: "", description: "", assignedTo: "" };
    let hasError = false;
    if (!taskData.title.trim()) {
      formErrors.title = "Title cannot be Empty";
      hasError = true;
    }
    if (!taskData.description.trim()) {
      formErrors.description = "Description cannot be Empty";
      hasError = true;
    }
    if (!taskData.assignedTo.trim()) {
      formErrors.assignedTo = "Please assign someone";
      hasError = true;
    }

    setErrors(formErrors);
    if (hasError) return;
    onSubmit();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center border">
      <div className="bg-white w-full max-w-sm  sm:max-w-md rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold">Create Task</h2>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            className={`w-full border rounded-lg p-2 mt-1 ${
              errors.title ? "border-red-500" : ""
            }`}
            value={taskData.title}
            onChange={(e) => {
              handleChange(e);
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            className={`w-full border rounded-lg p-2 mt-1 ${
              errors.description ? "border-red-500" : ""
            }`}
            rows={3}
            value={taskData.description}
            onChange={(e) => {
              handleChange(e);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Assign To</label>
          <div className="relative">
            <input
              name="assignedTo"
              type="text"
              className={`w-full border rounded-lg p-2 mt-1 ${
                errors.assignedTo ? "border-red-500" : ""
              }`}
              placeholder="Select a teammate"
              value={taskData.assignedTo}
              onChange={(e) => {
                handleChange(e);
              }}
              readOnly
              autoComplete="off"
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            />

            {showDropdown && (
              <ul className="absolute z-10 bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto w-full">
                {teamMates.slice(0, 20).map((mate: any) => (
                  <li
                    key={mate._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setTaskData((prev) => ({
                        ...prev,
                        assignedTo: mate.email,
                      }));
                      setErrors((prev) => ({ ...prev, assignedTo: "" }));
                      setShowDropdown(false)
                    }}
                  >
                    {mate.email}
                  </li>
                ))}
              </ul>
            )}
            {errors.assignedTo && (
              <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
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
              setErrors({ title: "", description: "", assignedTo: "" });
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
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
