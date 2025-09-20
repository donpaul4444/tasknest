"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddTeamMate from "@/app/components/AddTeamMate";
import CreateTaskModal from "@/app/components/CreateTaskModal";
import TeamMembers from "@/app/components/TeamMembers";
import { useProjectStore } from "@/store/projectStore";
import { useUIStore } from "@/store/uiStore";
import axios from "axios";
import { Plus, UserPlus, Users, X } from "lucide-react";
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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [project, setProject] = useState<{
    name?: string;
    createdBy: { _id: string };
  } | null>(null);
  const { data: session } = useSession();
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
  const [localDropdown, setLocalDropdown] = useState(false);
  const [isTeamMembersOpen, setIsTeamMembersOpen] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/projectId?projectId=${projectId}`);
        setProject(res.data || null);
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
        setTasks((prev) => [...prev, res.data.task]);
      }
    } catch (error) {
      console.log(error);
    }
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

  // --- 🔥 Handle Dragging
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination, source } = result;

    if (destination.droppableId === source.droppableId) return;

    // update locally
    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId
          ? { ...task, status: destination.droppableId }
          : task
      )
    );

    // update backend
    try {
      await axios.patch(`/api/tasks/${draggableId}`, {
        status: destination.droppableId,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await axios.delete(`/api/tasks/${taskId}`);
      if (res.data.success) {
        toast.success("Task deleted");
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      }
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    }
  };

  const statuses = ["todo", "on-progress", "review", "done"];

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 mt-2">
        <div>
          <h1 className="text-2xl font-bold">Project Board</h1>
          <p className="text-gray-600">{project?.name}</p>
        </div>
        <div className="flex  items-end gap-3 ml-auto">
          {project?.createdBy._id === session?.user?._id && (
            <>
              <button
                className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() => setIsOpen(true)}
              >
                <Plus size={18} />
                <span className="hidden sm:inline"> Create</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setLocalDropdown((prev) => !prev)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                >
                  <UserPlus size={18} />
                  <span className="hidden sm:inline"> Add Teammate</span>
                </button>

                {localDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-red-500 rounded-lg shadow-lg z-50">
                    <AddTeamMate />
                  </div>
                )}
              </div>
            </>
          )}
          <div className="relative">
            <button
              onClick={() => setIsTeamMembersOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <Users size={18} />
              <span className="hidden sm:inline">Team Members</span>
            </button>

            {isTeamMembersOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50">
                <TeamMembers
                  teamMates={teamMates}
                  setTeamMates={setTeamMates}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Kanban Board with Drag & Drop --- */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col lg:flex-row gap-4">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 bg-gray-100 rounded-2xl shadow p-4 dark:bg-gray-800  h-[600px] flex flex-col"
                >
                  <h3 className="text-lg font-semibold mb-3 capitalize ">
                    {status === "on-progress" ? "In Progress" : status}
                  </h3>
                  <div className="space-y-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 pr-1">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          draggableId={task._id!}
                          index={index}
                          key={task._id}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 rounded-lg shadow dark:bg-gray-500"
                              onClick={() => setEditingTask(task)}
                            >
                              <p className="font-semibold">{task.title}</p>
                              <div className="flex justify-between">
                                <div className="text-xs text-gray-700 dark:text-gray-200">
                                  <span className="font-semibold">
                                    Assigned To:
                                  </span>{" "}
                                  <span>
                                    {task.assignedTo?.email || "Unassigned"}
                                  </span>
                                </div>

                                {project?.createdBy._id ===
                                  session?.user?._id && (
                                  <button
                                    className="text-xs bg-black px-2 py-1 text-white rounded cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteTask(task._id!);
                                    }}
                                  >
                                    <X size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modals */}
      <CreateTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        taskData={taskData}
        setTaskData={setTaskData}
        onSubmit={handleCreateTask}
        teamMates={teamMates}
        mode={"create"}
      />
      {editingTask && (
        <CreateTaskModal
          isOpen={true}
          onClose={() => setEditingTask(null)}
          taskData={{
            title: editingTask.title,
            description: editingTask.description,
            assignedTo: editingTask.assignedTo
              ? editingTask.assignedTo._id
              : "",
            priority: editingTask.priority,
          }}
          setTaskData={setEditingTask}
          onSubmit={handleCreateTask}
          teamMates={teamMates}
          mode={project?.createdBy._id === session?.user?._id ? "edit" : "view"}
        />
      )}
    </div>
  );
}
