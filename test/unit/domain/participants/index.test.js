'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const Logger = require('@mojaloop/central-services-shared').Logger
const ParticipantService = require('../../../../src/domain/participants')
const ParticipantModel = require('../../../../src/models/participants/index')


Test('ParticipantService', async (ParticipantServiceTest) => {
  let sandbox

  ParticipantServiceTest.beforeEach(test => {
    sandbox = Sinon.createSandbox()
    test.end()
  })

  ParticipantServiceTest.afterEach(test => {
    sandbox.restore()
    test.end()
  })

  await ParticipantServiceTest.test('getByParticipantId should', async getByParticipantIdTest => {
    try {
        const options = {
            logger: Logger
          }
 
          const bankCode = 111

      const participantResultStub = {
        "partyList": [
          {
            "fspId": "001",
            "currency": "TZS",
            "partySubIdOrType": ""
          }
        ]
      }
   
   
      ParticipantModel.getByParticipantId = sandbox.stub().returns(participantResultStub)
    

      await getByParticipantIdTest.test('return participant accounts', async test => {
        try {
          let result = await ParticipantService.getByParticipantId( bankCode , options)
          test.ok(result, 'Result returned')
          test.ok(ParticipantModel.getByParticipantId.withArgs( bankCode ).calledOnce, 'ParticipantModel.getByParticipantId with args ... called once')
          test.end()
        } catch (err) {
          Logger.error(`getByParticipantIdTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await getByParticipantIdTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      getByParticipantIdTest.fail()
      getByParticipantIdTest.end()
    }
  })


  await ParticipantServiceTest.test('createParticipant should', async createParticipantTest => {
    try {
        const options = {
            logger: Logger
          }
 
          const fspId = '003'
          const currency = 'TZS'

      const participantResultStub = {
        "partyList": [
          {
            "fspId": "001",
            "currency": "TZS",
            "partySubIdOrType": ""
          }
        ]
      }
   
   
      ParticipantModel.getByParticipantId = sandbox.stub().returns(participantResultStub)
    //   ParticipantModel.createParticipant = sandbox.stub().returns('created')
    

      await createParticipantTest.test('return participant accounts', async test => {
        try {
          let result = await ParticipantService.getByParticipantId( fspId , options)
          test.ok(result,'Result returned')
          test.ok(ParticipantModel.getByParticipantId.withArgs( fspId ).calledOnce, 'ParticipantModel.getByParticipantId with args ... called once')
          //test.ok(ParticipantModel.createParticipant.withArgs( fspId, currency).calledOnce, 'ParticipantModel.createParticipant with args ... called once')
          test.end()
        } catch (err) {
          Logger.error(`getByParticipantIdTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await createParticipantTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      createParticipantTest.fail()
      createParticipantTest.end()
    }
  })

  await ParticipantServiceTest.test('updateByParticipantId should', async updateByParticipantIdTest => {
    try {
        const options = {
            logger: Logger
          }
 
          const fspId = '111'
          const currency = 'TZS'

      const participantResultStub = 'Ok'
   
   
      ParticipantModel.updateByParticipantId = sandbox.stub().returns(participantResultStub)
    

      await updateByParticipantIdTest.test('update participant accounts', async test => {
        try {
          let result = await ParticipantService.updateByParticipantId( fspId, currency , options)
          test.ok(result, 'Result returned')
          test.ok(ParticipantModel.updateByParticipantId.withArgs( fspId, currency ).calledOnce, 'ParticipantModel.getByParticipantId with args ... called once')
          test.end()
        } catch (err) {
          Logger.error(`getByParticipantIdTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await updateByParticipantIdTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      updateByParticipantIdTest.fail()
      updateByParticipantIdTest.end()
    }
  })


//   await ParticipantServiceTest.test('deleteByParticipantId should', async deleteByParticipantIdTest => {
//     try {
//         const options = {
//             logger: Logger
//           }
//           const fspId = '111'

//       const participantResultStub = 'Ok'
   
   
//       ParticipantModel.deleteParticipant = sandbox.stub()
    

//       await deleteByParticipantIdTest.test('delete participant accounts', async test => {
//         try {
//           let result = await ParticipantService.deleteByParticipantId( fspId , options)
//           test.ok(result, 'Result returned')
//           test.ok(ParticipantModel.deleteParticipant.withArgs( fspId ).calledOnce, 'ParticipantModel.getByParticipantId with args ... called once')
//           test.end()
//         } catch (err) {
//           Logger.error(`getByParticipantIdTest failed with error - ${err}`)
//           test.fail()
//           test.end()
//         }
//       })

//       await deleteByParticipantIdTest.end()
//     } catch (err) {
//       Logger.error(`ParticipantServiceTest failed with error - ${err}`)
//       deleteByParticipantIdTest.fail()
//       deleteByParticipantIdTest.end()
//     }
//   })

  await ParticipantServiceTest.end()
})
