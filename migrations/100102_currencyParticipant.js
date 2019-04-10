'use strict'

exports.up = async (knex, Promise) => {
  return await knex.schema.hasTable('currencyParticipant').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('currencyParticipant', (t) => {
        t.string('currencyId', 3).notNullable()
        t.string('participantId', 20).unique().notNullable()
      })
    }
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('currencyParticipant')
}
