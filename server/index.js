const express = require('express');
const path = require('path');
const router = require('./router.js');
const logRoutes = require('./middleware/logRoutes.js');

const app = express();
const port = 8080;

const pathToFrontendDist = path.join(__dirname, '../app/dist');

const serveStatic = express.static(pathToFrontendDist);
const parseJSON = express.json();

app.use(logRoutes);
app.use(serveStatic);
app.use(parseJSON);
app.use('/api', router);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
