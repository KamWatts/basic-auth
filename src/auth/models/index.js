'use strict'

require('dotenv').config();
const { Sequelize } = require('sequelize');
const DB_URL = process.env.DB_URL || 'sqlite:memory'
const sequelize = new Sequelize(DB_URL);

const createUser = require('./user-model');
const UserModel = createUser(sequelize);

module.exports = {
  sequelize,
  User: UserModel
}