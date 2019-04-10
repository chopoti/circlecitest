'use strict'

const Facade = require('./facade')
const Participant = require('./participant')
const Configuration = require('../configuration')

module.exports = {
  getByParticipantId: Facade.getByParticipantId,
  createParticipant: Participant.createParticipant,
  updateByParticipantId: Facade.updateByParticipantId,
  deleteByParticipantId: Facade.deleteByParticipantId,
  getParticipant: Participant.getParticipant,
  deleteParticipant: Participant.deleteParticipant,
  getConfiguration: Configuration.getConfiguration
      }
