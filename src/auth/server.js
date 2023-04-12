'use strict'

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const userRouter = require('./router');
app.use(userRouter);

app.use(express.urlencoded({ extended: true }));

const userError = require('../../middleware/404.test');
const serverError = require('../../middleware/500');

app.use(userError);
app.use(serverError);

module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log('Server up and running');
  })
}