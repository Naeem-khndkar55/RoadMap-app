const PriorityBadge = ({ priority }) => {
  const colors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
