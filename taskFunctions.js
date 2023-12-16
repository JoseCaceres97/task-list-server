const express = require('express');
const router = express.Router();

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

// LISTAR TODAS LAS TAREAS
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// LISTAR POR ID
router.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// CREAR UNA NUEVA TAREA
router.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json({ message: 'Tarea Creada', })
});

// ACTUALIZAR TAREAS
router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada.' });
  }
});

// ELIMINAR TAREAS
router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada!' });
  } else {
    res.status(404).json({ error: 'Tarea no encontrada...' });
  }
});

// LISTAR TAREAS COMPLETADAS
router.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

// LISTAR TAREAS INCOMPLETAS
router.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = router;