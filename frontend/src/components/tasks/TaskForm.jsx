import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useTasks } from "../../context/TaskContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
const TaskForm = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  taskToEdit,
  triggerButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createTask, updateTask } = useTasks();
  const [task, setTask] = useState(
    taskToEdit || {
      title: "",
      description: "",
      priority: "medium",
      status: "Pending",
      dueDate: "",
    }
  );

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, task);
        toast.success("Task Edited successfully!");
      } else {
        await createTask(task);
        toast.success("Task created successfully!");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setTask(
      taskToEdit || {
        title: "",
        description: "",
        priority: "medium",
        status: "Pending",
        dueDate: "",
      }
    );
    propsOnClose ? propsOnClose() : setIsOpen(false);
  };

  const modalIsOpen = propsIsOpen !== undefined ? propsIsOpen : isOpen;
  const modalOnClose = propsOnClose || (() => setIsOpen(false));

  return (
    <>
      {triggerButton && (
        <button onClick={() => setIsOpen(true)}>{triggerButton}</button>
      )}

      <Dialog
        open={modalIsOpen}
        onClose={modalOnClose}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white shadow-xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {taskToEdit ? "Edit Task" : "Create New Task"}
              </Dialog.Title>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200"
                />
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={task.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="On_going">On going</option>
                    <option value="Collaborative_Task">
                      Collaborative Task
                    </option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600"
                >
                  {taskToEdit ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default TaskForm;
