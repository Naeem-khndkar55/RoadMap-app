import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const EmptyState = () => (
  <div className="text-center p-8">
    <ClipboardDocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
    <p className="mt-1 text-sm text-gray-500">
      Get started by creating a new task.
    </p>
  </div>
);

export default EmptyState;
