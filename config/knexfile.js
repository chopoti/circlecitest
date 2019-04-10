'use strict'

const migrationsDirectory = '../migrations'
const seedsDirectory = '../seeds'

const Config = require('../config/default.json')


module.exports = {
  client: 'mysql',
  version: '5.6',
  connection: Config.DATABASE_URI,
  migrations: {
    directory: migrationsDirectory,
    tableName: 'migration',
    stub: `${migrationsDirectory}/migration.template`
  },
  seeds: {
    directory: seedsDirectory,
    loadExtensions: ['.js']
  }
}
