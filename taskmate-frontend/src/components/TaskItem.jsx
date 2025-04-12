import React from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const { _id, title, description, completed, dueDate, category } = task;

  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border ${
        completed ? 'border-green-300' : 'border-gray-200'
      } rounded-xl shadow-sm p-4 transition duration-200 ${
        completed ? 'opacity-80' : ''
      }`}
    >
      {/* Task Info */}
      <div className="flex-1 space-y-1">
        <h3 className={`text-lg font-semibold ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {title}
        </h3>
        {description && (
          <p className={`text-sm ${completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        )}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
          {dueDate && (
            <span className="flex items-center gap-1">
              📅 {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
          {category && (
            <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md text-blue-600 font-medium">
              🏷️ {category}
            </span>
          )}
        </div>
      </div>

      {/* Task Actions */}
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onToggle(_id)}
          className={`px-3 py-1 rounded-md font-medium text-sm ${
            completed
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          } transition duration-150`}
        >
          {completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 rounded-md bg-blue-100 text-blue-800 font-medium text-sm hover:bg-blue-200 transition duration-150"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="px-3 py-1 rounded-md bg-red-100 text-red-700 font-medium text-sm hover:bg-red-200 transition duration-150"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
