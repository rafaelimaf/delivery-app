require('express-async-errors');
const express = require('express');
const loginRoute = require('../routes/login');
const { errorMiddleware } = require('../middlewares/errorMiddleware');

const app = express();
app.use(express.json());
app.use('/login', loginRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);
module.exports = app;
