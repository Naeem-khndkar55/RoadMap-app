import { createContext, useContext, useState } from "react";
import {
  getTasks as fetchTasks,
  createTask as addTask,
  updateTask as modifyTask,
  deleteTask as removeTask,
} from "../services/taskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const data = await addTask(taskData);
      setTasks([...tasks, data]);
      return data;
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const data = await modifyTask(id, taskData);
      setTasks(tasks.map((task) => (task._id === id ? data : task)));
      return data;
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  const deleteTask = async (id) => {
    try {
      await removeTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      throw err.response?.data?.message || err.message;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
