"use client";

import { useEffect, useState } from "react";
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
  mode?: "create" | "edit" | "view";
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  taskData,
  setTaskData,
  onSubmit,
  teamMates,
  mode,
}: CreateTaskModalProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  useEffect(() => {
    if (isOpen && mode === "create") {
      setTaskData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
      });
      setErrors({ title: "", description: "", assignedTo: "" });
    }
  }, [isOpen, mode]);
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    const formErrors = { title: "", description: "", assignedTo: "" };
    let hasError = false;
    if (!taskData.title.trim()) {
      formErrors.title = "Title cannot be empty";
      hasError = true;
    } else if (taskData.title.length > 20) {
      formErrors.title = "Title cannot exceed 20 characters";
      hasError = true;
    }

    if (!taskData.description.trim()) {
      formErrors.description = "Description cannot be Empty";
      hasError = true;
    }else if (taskData.description.length > 100) {
      formErrors.description = "Description cannot exceed 100 characters";
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
        <h2 className="text-lg font-bold">
          {mode === "create" ? "Create Task" : "Task"}
        </h2>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            className={`w-full border rounded-lg p-2 mt-1 ${
              errors.title ? "border-red-500" : ""
            }`}
            value={taskData.title}
            disabled={mode !== "create"}
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
            disabled={mode !== "create"}
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
            {/* Fake input field */}
            <button
              type="button"
              disabled={mode !== "create"}
              onClick={() => setShowDropdown(!showDropdown)}
              className={`w-full border rounded-lg p-2 mt-1 text-left flex justify-between items-center ${
                errors.assignedTo ? "border-red-500" : ""
              }`}
            >
              {teamMates.find((mate) => mate._id === taskData.assignedTo)
                ?.email || "Select a teammate"}
              <span className="ml-2 text-gray-500">▾</span>
            </button>

            {/* Dropdown list */}
            {showDropdown && (
              <ul className="absolute z-10 bg-white dark:bg-gray-800 border rounded-lg mt-1 max-h-40 overflow-y-auto w-full shadow-lg">
                {teamMates.slice(0, 20).map((mate) => (
                  <li
                    key={mate._id}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setTaskData((prev) => ({
                        ...prev,
                        assignedTo: mate._id,
                      }));
                      setErrors((prev) => ({ ...prev, assignedTo: "" }));
                      setShowDropdown(false);
                    }}
                  >
                    <input
                      type="radio"
                      name="assignedTo"
                      checked={taskData.assignedTo === mate._id}
                      onChange={() =>
                        setTaskData((prev) => ({
                          ...prev,
                          assignedTo: mate._id,
                        }))
                      }
                      className="mr-2"
                    />
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
            disabled={mode !== "create"}
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
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          {mode == "create" && (
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              Create Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
