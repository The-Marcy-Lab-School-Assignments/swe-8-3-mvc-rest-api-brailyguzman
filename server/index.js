const express = require('express');
const path = require('path');
const logRoutes = require('./middleware/logRoutes.js');
const {
  getUserController,
  newUserController,
  editUserController,
  deleteUserController,
  getUsersController,
} = require('./controllers/userController.js');

const app = express();
/*
When I send a PATCH request to port 8080 on my computer,
the request hangs and never sends back a response.

Using a different port like 3000 fixes it, not sure
what could be causing it.
*/
const port = 3000;

const pathToFrontendDist = path.join(__dirname, '../app/dist');

const serveStatic = express.static(pathToFrontendDist);
const parseJSON = express.json();

app.use(logRoutes);
app.use(serveStatic);
app.use(parseJSON);

app.post('/api/users', newUserController);
app.get('/api/users', getUsersController);

app.get('/api/users/:id', getUserController);
app.patch('/api/users/:id', editUserController);
app.delete('/api/users/:id', deleteUserController);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
