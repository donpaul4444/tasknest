"use client";

import AddTeamMate from "@/app/components/AddTeamMate";
import CreateTaskModal from "@/app/components/CreateTaskModal";
import TeamMembers from "@/app/components/TeamMembers";
import { useProjectStore } from "@/store/projectStore";
import { useUIStore } from "@/store/uiStore";
import axios from "axios";
import { Plus, UserPlus, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type User = {
  _id: string;
  email: string;
};

type Task = {
  _id?: string;
  title: string;
  description: string;
  assignedTo: User | null;
  priority: string;
  status: string;
};

export default function ProjectBoardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<{ name?: string; createdBy: { _id: string } } | null>(
    null
  );
  const { data: session, status } = useSession();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "low",
  });
  const { projectId } = useProjectStore();
  const [teamMates, setTeamMates] = useState<{ email: string; _id: string }[]>(
    []
  );

  const { openDropdownId, setOpenDropdownId } = useUIStore();

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
useEffect(() => {
  if (!projectId) return;

  const fetchProject = async () => {
    try {
      const res = await axios.get(`/api/projectId?projectId=${projectId}`);
      setProject(res.data || null);
      console.log("project", res.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  fetchProject();
}, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    const fetchData = async () => {
      const res = await axios.get(`/api/teammates?projectId=${projectId}`);
      setTeamMates(res?.data?.result);
    };
    fetchData();
  }, [isOpen, projectId]);

  const handleCreateTask = async () => {
    try {
      const res = await axios.post("/api/task", { ...taskData, projectId });
      setTaskData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "",
      });
      if (res.data.success) {
        toast.success("Task Created Successfully");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/api/task?projectId=${projectId}`);
        setTasks(res?.data?.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [projectId]);

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Project Board
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
{project?.name}
          </p>
        </div>

        <div className="flex items-end gap-3  ml-auto">
          {project?.createdBy._id === session?.user?._id && (
            <>
              <div>
                <button
                  className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:bg-white dark:text-black dark:hover:bg-red-100 transition"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline"> Create</span>
                </button>
              </div>

              {/* Add Teammate Button */}
              <div className="relative" data-dropdown-id="addTeammate">
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition dark:bg-white dark:text-black"
                  onClick={() => toggleDropdown("addTeammate")}
                >
                  <UserPlus size={18} />
                  <span className="hidden sm:inline">Add Teammate</span>
                </button>
                {openDropdownId === "addTeammate" && <AddTeamMate />}
              </div>
            </>
          )}
          {/* View Teammates Button */}
          <div className="relative" data-dropdown-id="teamMembers">
            <button
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition"
              onClick={() => toggleDropdown("teamMembers")}
            >
              <Users size={18} />
              <span className="hidden sm:inline">Team Member</span>
            </button>
            {openDropdownId === "teamMembers" && (
              <TeamMembers teamMates={teamMates} setTeamMates={setTeamMates} />
            )}
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="overflow-x-auto">
        <div className="flex flex-col lg:flex-row  gap-4 lg:min-w-full">
          {["todo", "on-progress", "review", "done"].map((status) => {
            const statusTitle =
              status === "todo"
                ? "To Do"
                : status === "on-progress"
                ? "In Progress"
                : status === "review"
                ? "Review"
                : "Done";

            return (
              <div
                key={status}
                className="flex-1 h-[400px] lg:mt-0 mt-5 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col lg:max-h-[70vh] lg:h-screen"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {statusTitle}
                </h3>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {tasks
                    .filter((task: Task) => task.status === status)
                    .reverse()
                    .map((task) => (
                      <div
                        key={task._id}
                        className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow text-sm text-gray-700 dark:text-gray-100"
                      >
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-gray-500">{task.description}</p>
                        <p className="text-xs mt-1 text-gray-600">
                          Assigned To: {task.assignedTo?.email}
                        </p>
                      </div>
                    ))}
                  {tasks.filter((task) => task.status === status).length ===
                    0 && <p className="text-gray-500 text-sm">No tasks</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CreateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        taskData={taskData}
        setTaskData={setTaskData}
        onSubmit={handleCreateTask}
        teamMates={teamMates}
      />
    </div>
  );
}
