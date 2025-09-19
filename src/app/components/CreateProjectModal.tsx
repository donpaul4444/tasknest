import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";


type Project = {
  _id: string;
  name: string;
};
type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (newProject: Project) => void;
};

const CreateProjectModal = ({
  isOpen,
  onClose,
  onProjectCreated,
}: CreateProjectModalProps) => {
  const [error, setError] = useState("");
  const [projectName, setProjectName] = useState("");
  const { data: session } = useSession();

  const handleCreateProject = async () => {
    if (projectName.trim() === "") {
      setError("Project name cannot be empty")
      return;
    }else if (projectName.trim().length > 20) {
  setError("Project name cannot exceed 20 characters");
  return;
}

    try {
      const res = await axios.post("/api/project", {
        name: projectName,
      });

      if (res.status === 201) {
        onProjectCreated(res.data.project);
        toast.success(res.data.message);
        setProjectName("");
        setError("");
        onClose();
      }
    } catch (error) {
      setError("Failed to create project");
      toast.error("Failed to create project ❌");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black  bg-opacity-50 flex justify-center items-center border">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-sm sm:max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Create Project
        </h3>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Project Name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              setError("");
            }}
            className={`w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              error ? "border-red-500" : ""
            }`}
          ></input>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <p>
            <strong>Created By:</strong> {session?.user?.email}
          </p>
          <p>
            <strong>Created At:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCreateProject}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
