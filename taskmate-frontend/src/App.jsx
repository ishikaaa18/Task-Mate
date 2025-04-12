import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from './axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks', {
        params: {
          search: searchQuery,
          category: categoryFilter,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchQuery, categoryFilter]);

  const addTask = async (taskData) => {
    try {
      await axios.post('/tasks', taskData);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      await axios.put(`/tasks/${id}`, updatedData);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        TaskMate 📝
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Task Form */}
        <div className="lg:w-1/3">
          <TaskForm
            onSubmit={editingTask ? (data) => updateTask(editingTask._id, data) : addTask}
            editingTask={editingTask}
            clearEdit={() => setEditingTask(null)}
          />
        </div>

        {/* Right: Filters + Task List */}
        <div className="lg:w-2/3">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="🔍 Search tasks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded border border-blue-300 w-full sm:w-1/2"
            />
            <input
              type="text"
              placeholder="🏷️ Filter by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 rounded border border-blue-300 w-full sm:w-1/2"
            />
          </div>

          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={setEditingTask}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
