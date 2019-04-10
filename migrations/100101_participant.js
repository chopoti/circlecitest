'use strict'

exports.up = async (knex, Promise) => {
  return await knex.schema.hasTable('participant').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('participant', (t) => {
        t.increments('participantId').primary().notNullable()
        t.string('name', 512).notNullable()
        t.integer('isActive', 4).notNullable()
        t.dateTime('createdDate').defaultTo(knex.fn.now()).notNullable()
      })
    }
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('participant')
}
