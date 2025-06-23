const StatusBadge = ({ status }) => {
  const colors = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const displayText = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {displayText[status]}
    </span>
  );
};

export default StatusBadge;
