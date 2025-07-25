"use client";
import { useRouter } from "next/navigation";
import { FolderIcon } from "@heroicons/react/24/outline";

const mockProjects = [
  { id: "1", name: "Portfolio Website" },
  { id: "2", name: "E-commerce Store" },
  { id: "3", name: "Blog CMS" },
  { id: "4", name: "Task Manager" },
];

export default function ProjectListPage() {
  const router = useRouter();

  const handleOpenProject = (id: string) => {
    router.push(`/project/${id}`);
  };

  return (
    <div className=" mx-auto py-10 px-4 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">Your Projects</h2>
        <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition">
          + Create
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleOpenProject(project.id)}
            className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all p-6 "
          >
            <div className="flex items-center gap-4 mb-2">
              <FolderIcon className="w-6 h-6 text-blue-500 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {project.name}
              </h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Click to open project board
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
