const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use('/list-view', listViewRouter); 
app.use('/list-edit', listEditRouter); 

app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
      return res.status(405).send("Método no permitido");
    }
    next();
  });

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});