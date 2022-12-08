const express = require('express');
const error = require('./middleware/error');
const routes = require('./routes/index');
const db = require('./db/');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

app.use('/user', routes.user);
app.use('/overview', routes.overview);
app.use('/exercise', routes.exercise);
app.use('/nutrition', routes.nutrition);
app.use('/report', routes.report);
app.use(error);

module.exports = app;
