"use client";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/components/ConfirmModal";
import { useProjectStore } from "@/store/projectStore";
import CreateProjectModal from "@/app/components/CreateProjectModal";
import { log } from "console";

type Project = {
  _id: string;
  name: string;
  createdBy?: {
    email?: string;
  };
};

export default function ProjectListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchProjects = async () => {
        try {
          const res = await axios.get("/api/project");
          setProjects(res.data);
          console.log(res.data);
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
    return (
      <div className="flex item-center justify-center h-screen">
        Loading....
      </div>
    );
  }

  const handleOpenProject = (id: string) => {
    useProjectStore.getState().setProjectId(id);
    router.push(`/project/${id}`);
  };
  const handleProjectCreated = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const handleDeleteProject = async (id: string) => {
    const res = await axios.delete(
      `/api/project?id=${id}&email=${session?.user?.email}`
    );
    if (res.status === 200) {
      toast.success(res.data.message);
      setProjects((prev) => prev.filter((project) => project._id !== id)); //
      setDeleteTargetId("");
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
          {projects.map((project: Project) => (
            <div
              key={project._id}
              className=" bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all p-6 cursor-pointer"
              onClick={() => handleOpenProject(project._id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <FolderIcon className="w-7 h-7 text-blue-600 dark:text-purple-400 transition-transform group-hover:scale-110" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created by: {project?.createdBy?.email || "Unknown"}
                  </p>
                </div>

                <button
                  className="text-white bg-black rounded-lg px-2 dark:text-black dark:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTargetId(project._id);
                  }}
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

      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
}
