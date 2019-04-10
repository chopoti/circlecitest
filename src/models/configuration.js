'use strict'


 const Db = require('@mojaloop/central-services-database').Db

const Configuration = {
  getConfiguration: async function () {


    try {
        const knex = await Db.getKnex()
        return knex('configuration')
          .select('key','value')
      } catch (err) {
        throw err
      }
   
  }
}

module.exports = Configuration
