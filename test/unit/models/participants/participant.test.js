'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const Db = require('@mojaloop/central-services-database').Db
const Logger = require('@mojaloop/central-services-shared').Logger
const ParticipantsModel = require('../../../../src/models/participants/index')

Logger.error('this is error')

Test('ParticipantModel', async (ParticipantModelTest) => {
    let sandbox
    
    ParticipantModelTest.beforeEach(test => {
      sandbox = Sinon.createSandbox()
      test.end()
    })
  
    ParticipantModelTest.afterEach(test => {
      sandbox.restore()
      test.end()
    })
  
  
    await ParticipantModelTest.test('ParticipantModel should', async getParticipantTest => {
      try {
        await getParticipantTest.test('throw error if Database unavailable', async test => {
          try {
            const participantId = 111
            Db.participant = {
              findOne: sandbox.stub()
            }
            Db.participant.findOne = sandbox.stub().throws(new Error('Error occurred'))
            try {
              await ParticipantsModel.getParticipant(participantId)
              test.fail('Error expected, but not thrown!')
            } catch (err) {
              test.ok(err.message, 'Error thrown')
              test.end()
            }
          } catch (err) {
            test.end()
          }
        })
  
        await getParticipantTest.test('get participant by id', async test => {
          try {
            const participantId = '111'
            const participant ={
                participantId: 7,
                name: '008',
                isActive: 1,
                createdDate: '2019-04-08T09:34:59.000Z' }

            Db.participant = {
              findOne: sandbox.stub().returns(participant)
            }
            let result = await ParticipantsModel.getParticipant(participantId)
            test.deepEqual(result, participant, 'results match')
            test.end()
          } catch (err) {
            Logger.error(`getParticipantTest failed with error - ${err}`)
            test.fail()
            test.end()
          }
        })
  
        await getParticipantTest.end()
      } catch (err) {
        Logger.error(`ParticipantModel failed with error - ${err}`)
        getParticipantTest.fail()
        getParticipantTest.end()
      }
    })

     await ParticipantModelTest.test('ParticipantModel should', async createParticipantTest => {
      try {
        await createParticipantTest.test('return insert participant into database', async test => {
            
          try {
            const fspId = '123'
            const currency = 'TZS'
            
            Db.participant = {
              insert: sandbox.stub().returns(true)
            }
            Db.currencyParticipant = {
                insert: sandbox.stub().returns(true)
              }
  
            let result = await ParticipantsModel.createParticipant(fspId, currency)
            test.ok(result, 'Result returned and matched')
            test.ok(Db.participant.insert.withArgs({
                name: fspId,
                isActive: 1
              }).calledOnce, 'insert with args ... called once')
              test.ok(Db.currencyParticipant.insert.withArgs({
                currencyId: currency,
                participantId: fspId
              }).calledOnce, 'insert with args ... called once')
  
            Db.participant.insert = sandbox.stub().throws(new Error('Error occurred'))
            try {
                
              await ParticipantsModel.createParticipant(fspId, currency)
              test.fail('Error expected, but not thrown!')
            } catch (err) {
              test.equal(err.message, 'Error occurred', `Error "${err.message}" thrown as expected`)
            }
            test.end()
          } catch (err) {
            Logger.error(`createParticipantTest failed with error - ${err}`)
            test.fail()
            test.end()
          }
        })
  
        await createParticipantTest.end()
      } catch (err) {
        Logger.error(`ParticipantModel failed with error - ${err}`)
        createParticipantTest.fail()
        createParticipantTest.end()
      }
    })


    await ParticipantModelTest.test('ParticipantModel should', async deleteParticipantTest => {
        try {
          await deleteParticipantTest.test('return status for participant deleted in the database', async test => {
              
            try {
              const fspId = '111'
              const currency = 'TZS'

              Db.getKnex = sandbox.stub()
              const knexStub = sandbox.stub()
              Db.getKnex.returns(knexStub)
              const whereStub = sandbox.stub()
              const updateStub = sandbox.stub()
              knexStub.returns({
                  where: whereStub.returns({
                      update: updateStub
                  })
              })
              
         
              let result = await ParticipantsModel.deleteParticipant(fspId)
              test.deepEqual(result,undefined, 'Result match')
              test.ok(knexStub.withArgs('participant').calledOnce)
              test.ok(whereStub.withArgs({ name: fspId }).calledOnce)
              test.ok(updateStub.withArgs({ isActive: 0 }).calledOnce)
              test.end() 
    
              Db.getKnex = sandbox.stub().throws(new Error('Error occurred'))
              try {
                  
                await ParticipantsModel.createParticipant(fspId)
                test.fail('Error expected, but not thrown!')
              } catch (err) {
                test.equal(err.message, 'Error occurred', `Error "${err.message}" thrown as expected`)
              }
            
            } catch (err) {
              Logger.error(`deleteParticipantTest failed with error - ${err}`)
              test.fail()
              test.end()
            }
          })
    
          await deleteParticipantTest.end()
        } catch (err) {
          Logger.error(`ParticipantModel failed with error - ${err}`)
          deleteParticipantTest.fail()
          deleteParticipantTest.end()
        }
      })
    
  
    await ParticipantModelTest.end()
  })