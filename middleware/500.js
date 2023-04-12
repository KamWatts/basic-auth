'use strict'

serverError = (error, req, res, next) => {
  console.log(error);
  res.status(500).send('Failed server')
}

module.exports = serverError