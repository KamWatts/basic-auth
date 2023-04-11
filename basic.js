'use strict'

function basic(request, response, next) {
  console.log(request.headers)
  if (request.header.authorization) {
    // request.headers.authorization.split(' ').pop().split(':'); // ['Basic', 'abcshdg233435445']

    // check the username

    // check the password
    
    next();
  } else {
    response.status(403).send('Invalid Login')
  }
}

module.exports = basic