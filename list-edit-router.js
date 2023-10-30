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

listEditRouter.use((req, res, next) => {
    if ((req.method === 'POST' || req.method === 'PUT') && !req.body) {
      return res.status(400).send("Solicitud con cuerpo vacío.");
    }
  
    if (req.method === 'POST' || req.method === 'PUT') {
      const { id, isCompleted, description } = req.body;
      if (!id || typeof isCompleted !== 'boolean' || !description) {
        return res.status(400).send("Solicitud con información no válida o atributos faltantes para crear tareas.");
      }
    }
  
    next();
  });

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