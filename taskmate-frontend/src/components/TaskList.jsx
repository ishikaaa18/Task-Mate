import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <div className="flex-1 px-4 py-6 bg-blue-50 min-h-screen overflow-y-auto">
      {tasks.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-8">🚫 No tasks found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;

