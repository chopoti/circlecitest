'use strict'

exports.up = async (knex, Promise) => {
  return await knex.schema.hasTable('configuration').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('configuration', (t) => {
        t.increments('configId').primary().notNullable()
        t.string('key', 100).unique().notNullable()
        t.string('value', 100).notNullable()
      })
    }
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('configuration')
}
