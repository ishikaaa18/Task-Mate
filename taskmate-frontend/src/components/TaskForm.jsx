import React, { useState, useEffect } from 'react';

const initialState = {
  title: '',
  description: '',
  dueDate: '',
  category: '',
};

const TaskForm = ({ onSubmit, editingTask, clearEdit }) => {
  const [taskData, setTaskData] = useState(initialState);

  useEffect(() => {
    if (editingTask) setTaskData(editingTask);
    else setTaskData(initialState);
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskData);
    setTaskData(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold text-blue-700 text-center tracking-wide">
        {editingTask ? '✏️ Edit Task' : '➕ Add New Task'}
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={taskData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          placeholder="Enter task description"
          value={taskData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate?.slice(0, 10)}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="category"
          placeholder="e.g. Work, Personal"
          value={taskData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-center gap-4 pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={clearEdit}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
