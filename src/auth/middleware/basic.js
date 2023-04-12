'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { User } = require('../models'); // assuming the User model is defined in a separate file

async function validate(request, response, next) {
  try {
    const basicHeader = request.headers.authorization.split(' ');
    const encodedString = basicHeader.pop();
    const decodedString = base64.decode(encodedString);
    const [username, password] = decodedString.split(':');

    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      response.status(403).send('Invalid Login');
      return;
    }

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      response.status(403).send('Invalid Login');
      return;
    }

    response.status(200).json(user);
    next();
  } catch (error) {
    console.error(error);
    response.status(403).send('Invalid Login');
  }
}

module.exports = validate;
