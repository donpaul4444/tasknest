"use client";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/components/ConfirmModal";

type Project = {
  _id: string;
  name: string;
  // add other fields as needed
};

export default function ProjectListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchProjects = async () => {
        try {
          const res = await axios.get(
            `/api/project?email=${session?.user?.email}`
          );
          setProjects(res.data);
        } catch (error) {
          console.log("Error fetching projects", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }
  }, [status, session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  const handleOpenProject = (id: string) => {
    router.push(`/project/${id}`);
  };

  const handleCreateProject = async () => {
    if (projectName.trim() === "") {
      setError("Project name cannot be empty");
      return;
    }

    try {
      const res = await axios.post("/api/project", {
        name: projectName,
        email: session?.user?.email,
      });

      if (res.status === 201) {

        const newProject = res.data.project
        setProjects((prev) => [...prev, newProject])
        setShowModal(false);
        setProjectName("");

        toast.success(res.data.message);
      }
    } catch (error) {
      setError("Failed to create project");
      toast.error("Failed to create project ❌");
    }
  };

  const handleDeleteProject = async (id: any) => {
    const res = await axios.delete(
      `/api/project?id=${id}&email=${session?.user?.email}`
    );
    if (res.status === 200) {
      toast.success(res.data.message);
  setProjects((prev) => prev.filter((project) => project._id !== id)); //
setDeleteTargetId("")
    } else {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className=" mx-auto py-10 px-4 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Your Projects
        </h2>
        <button
          className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          onClick={() => setShowModal(true)}
        >
          + Create
        </button>
      </div>

      {loading ? (
        <p>Loading Projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No projects found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {projects.map((project: any) => (
            <div
              key={project._id}
             
              className=" bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all p-6"
            >
              <div className="flex items-center gap-4 mb-2">
                <FolderIcon className="w-6 h-6 text-blue-500 group-hover:scale-110 transition" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {project.name}
                </h3>
              </div>
              <div className="flex justify-between">
                <div  onClick={() => handleOpenProject(project._id)} className="cursor-pointer">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to open project board
                  </p>
                </div>

                <button
                  className="text-white bg-black rounded-lg px-2 dark:text-black dark:bg-white"
                  onClick={() => setDeleteTargetId(project._id)}
                >
                  Delete
                </button>

               
              </div>
            </div>
          ))}
           <ConfirmModal
                  isOpen={!!deleteTargetId}
                  title="Delete confirmation"
                  onConfirm={() => handleDeleteProject(deleteTargetId)}
                  onClose={() => setDeleteTargetId("")}
                  message="Are you sure you want to delete this project?"
                />
        </div>
      )}

      {showModal && (
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
                onClick={() => setShowModal(false)}
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
      )}
    </div>
  );
}
