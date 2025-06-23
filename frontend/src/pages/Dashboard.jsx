import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/tasks/TaskForm";
import TaskBoard from "../components/tasks/TaskList";
import { PlusIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const { tasks, getTasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All Task" || task.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All Task" || task.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">All Task List</h2>

        <div className="flex gap-4 items-center">
          <select
            className="border rounded-md px-3 py-2 text-sm text-gray-600"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            className="border rounded-md px-3 py-2 text-sm text-gray-600"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "On Going") {
                setStatusFilter("On going");
              } else {
                setStatusFilter(value);
              }
            }}
          >
            <option value="All Task">All Task</option>
            <option value="Pending">Pending</option>
            <option value="On Going">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <TaskForm
            triggerButton={
              <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add New Task
              </button>
            }
          />
        </div>
      </div>

      <TaskBoard tasks={filteredTasks} />
    </div>
  );
};

export default Dashboard;
