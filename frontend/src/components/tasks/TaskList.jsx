import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import TaskItem from "./TaskItem";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";

const TaskList = () => {
  const { tasks, loading, error } = useTasks();
  const [filter, setFilter] = useState("All Task");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All Task") return true;
    return task.status === filter;
  });

  if (loading) return <Spinner />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (tasks.length === 0) return <EmptyState />;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">All Task List</h2>

        <div className="flex gap-3 flex-wrap">
          {[
            "All Task",
            "Pending",
            "On Going",
            "Done",
            "Collaborative Task",
          ].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm transition font-medium ${
                filter === f
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
