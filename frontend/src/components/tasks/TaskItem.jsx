import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import PriorityBadge from "../ui/PriorityBadge";
import StatusBadge from "../ui/StatusBadge";
import avatar1 from "../../assets/react.svg";

const TaskItem = ({ task }) => {
  const { deleteTask } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(task._id);
      toast.success("Task Deleted");
    }
  };

  return (
    <>
      <div className="relative bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
              <img src={avatar1} alt="avatar" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>
              <p className="text-sm text-gray-500">
                {task.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <CalendarIcon className="w-4 h-4" />
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
          </div>

          <img
            src={avatar1}
            alt="avatar"
            className="w-6 h-6 rounded-full border"
          />
        </div>
      </div>

      <TaskForm
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        taskToEdit={task}
      />
    </>
  );
};

export default TaskItem;
