const express = require('express');
const listViewRouter = express.Router();

//LISTA DE TAREAS
const tasks = [
  {
    id: '1',
    isCompleted: true,
    description: 'Correr 2 kms',
  },
  {
    id: '2',
    isCompleted: false,
    description: 'Pagar servicios',
  },
  {
    id: '3',
    isCompleted: false,
    description: 'Mercar',
  },
  {
    id: '4',
    isCompleted: true,
    description: 'Enviar e-mails',
  },
  {
    id: '5',
    isCompleted: true,
    description: 'Lavar ropa',
  },
];

//
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