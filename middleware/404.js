'use strict'

clientError = (req, res, next) =>{
  console.log('404 Error');
  res.status(404).send('Not found or successful');
}

module.exports = clientError;