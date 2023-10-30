const express = require('express');
const listEditRouter = express.Router();

const tasks = [
  {
    id: '1',
    isCompleted: true,
    description: 'Complete task 1',
  },
  {
    id: '2',
    isCompleted: false,
    description: 'Incomplete task 2',
  },
];

listEditRouter.post('/create', (req, res) => {
  const newTask = req.body; 
  tasks.push(newTask);
  res.json(newTask);
});


listEditRouter.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada correctamente' });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

listEditRouter.put('/update/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body; 

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

module.exports = listEditRouter;