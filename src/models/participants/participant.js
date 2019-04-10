'use strict'


 const Db = require('@mojaloop/central-services-database').Db

const Participant = {
    getParticipant: async function (participantId) {
      
            try {
             
              return Db.participant.findOne({ name: participantId })
            } catch (err) {
              throw err
            }
          
   
  },

  createParticipant: async function (fspId, currency) {
 
      try {
       
        await Db.participant.insert({
          name: fspId,
          isActive: 1
        })
      await Db.currencyParticipant.insert({
        currencyId: currency,
        participantId: fspId
      })
    } catch (err) {
      throw err
    }


return 'created'

    
  },

  deleteParticipant: async function (fspId) {
    try {
      const knex = await Db.getKnex()
      
      return await knex('participant')
            .where({ name : fspId })
            .update({ isActive : 0 })   
               
      } catch (err) {
        throw err
      }
   

  },
}

module.exports = Participant
