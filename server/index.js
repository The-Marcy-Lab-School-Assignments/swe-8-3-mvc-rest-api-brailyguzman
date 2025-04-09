const express = require('express');
const path = require('path');
const logRoutes = require('./middleware/logRoutes.js');
const {
  getUserController,
  newUserController,
  editUserController,
  deleteUserController,
} = require('./controllers/userController.js');

const app = express();
const port = 8080;

const pathToFrontendDist = path.join(__dirname, '../app/dist');

const serveStatic = express.static(pathToFrontendDist);
const parseJSON = express.json();

app
  .route('/api/user')
  .get(getUserController)
  .post(newUserController)
  .patch(editUserController)
  .delete(deleteUserController);

app.use(logRoutes);
app.use(serveStatic);
app.use(parseJSON);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
