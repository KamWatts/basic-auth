'use strict'

require('dotenv').config();
const server = require('./src/auth/server');

const { sequelize } = require('./src/auth/models/index')

sequelize.sync()
.then(() => { server.start(3001);},
);