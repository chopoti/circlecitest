'use strict'


 const Db = require('@mojaloop/central-services-database').Db

const Facade = {
  getByParticipantId: async function (participantId) {
    try {
        let partyList = await Db.participant.query(builder => {
            return builder
            .join('currencyParticipant','participant.name','currencyParticipant.participantId')
            .select('participant.name AS fspId','currencyParticipant.currencyId AS currency')
            .where('participant.name',participantId)
            .andWhere('participant.isActive',1)})

          return {partyList};
    } catch (err) {
        console.log(err)
       throw new Error(err.message)
    }
   
  },

  updateByParticipantId: async function (fspId, currency) {
    const knex = await Db.getKnex()

    return await knex.transaction(async (trx) => {
      try {
       
        await knex('participant').transacting(trx)
          .where({ name : fspId })
          .update({ name: fspId})

          await knex('currencyParticipant').transacting(trx)
          .where({ participantId : fspId })
          .update({
            currencyId: currency,
            participantId: fspId
          })

        await trx.commit
        return 'Ok'
      } catch (err) {
        await trx.rollback
        throw err
      }
    })
      .catch((err) => {
        throw err
      })
  }
}

module.exports = Facade
