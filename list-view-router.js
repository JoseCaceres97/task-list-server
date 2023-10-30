const express = require('express');
const listViewRouter = express.Router();

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

listViewRouter.param('status', (req, res, next, status) => {
    if (status !== 'completed' && status !== 'incomplete') {
      return res.status(400).send("Parámetros no válidos.");
    }
    next();
  });

  listViewRouter.get('/:status', (req, res) => {

    const status = req.params.status;
  
    if (status === 'completed') {
      const completedTasks = tasks.filter(task => task.isCompleted);
      res.json(completedTasks);
    } else if (status === 'incomplete') {
      const incompleteTasks = tasks.filter(task => !task.isCompleted);
      res.json(incompleteTasks);
    }
  });

listViewRouter.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});


listViewRouter.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = listViewRouter;