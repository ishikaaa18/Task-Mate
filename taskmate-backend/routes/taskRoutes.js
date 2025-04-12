// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTask,
} = require('../controllers/taskController');

router.post('/', createTask);           // Add task
router.get('/', getTasks);              // Get/search/filter tasks
router.put('/:id', updateTask);         // Edit task
router.patch('/:id/toggle', toggleTask); // Toggle complete/incomplete
router.delete('/:id', deleteTask);      // Delete task

module.exports = router;
