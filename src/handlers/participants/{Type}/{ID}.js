'use strict'

const participants = require('../../../domain/participants/index')
require('dotenv').config();
const Boom = require('boom');
const Joi = require('joi');
 const TYPE_REGEX = new RegExp(process.env.TYPE_REGEX, "i");
const IDENTIFIER_REGEX = new RegExp(process.env.IDENTIFIER_REGEX, "i");
const SUPPORTED_CURRENCY_REGEX = new RegExp(process.env.SUPPORTED_CURRENCY_REGEX, "i");

//console.log('type rg', TYPE_REGEX)

/**
 * Operations on /participants/{Type}/{ID}
 */
module.exports = {

  get: async function ParticipantsByTypeAndIDGet(request, h) {

    // let configuration = await participants.getConfiguration();
    // const TYPE_REGEX = new RegExp(configuration[0].value);
    // const IDENTIFIER_REGEX = new RegExp(configuration[2].value);
    

    const type = request.params.Type;
    const identifier = request.params.ID;

    const identifierSchema = Joi.object().keys({
      Type: Joi.string().regex(TYPE_REGEX).required(),
      ID: Joi.string().regex(IDENTIFIER_REGEX).length(14).required()
    });

    var response = null;
    Joi.validate(
      {
        Type: type, ID: identifier
      }, identifierSchema, (err, value) => {
        if (err) {
          response = err.message;
        } else {
          var accountNumber = value.ID;
          var bankCode = accountNumber.substring(0, 3);
          response = participants.getByParticipantId(bankCode)
        }
      }
    )
    return response;
  },

  put: async function ParticipantsByTypeAndIDPut(request, h) {

    // let configuration = await participants.getConfiguration();
    // const IDENTIFIER_REGEX = new RegExp(configuration[2].value);
    // const SUPPORTED_CURRENCY_REGEX = new RegExp(configuration[1].value);
    let fspId = request.payload.fspId;
    let currency = request.payload.currency;

    const participantSchema = Joi.object().keys({
      CURRENCY: Joi.string().regex(SUPPORTED_CURRENCY_REGEX).required(),
      FSPID: Joi.string().regex(IDENTIFIER_REGEX).length(3).required(),
    });
    var response = null;

    try {
      Joi.validate(
        {
          CURRENCY: currency, FSPID: fspId
        }, participantSchema, (err, value) => {
          if (err) {
            console.log(err);
            response = err.message;
          } else {

            response = participants.updateByParticipantId(value.FSPID, value.CURRENCY)

          }
        }
      )

      return response

    } catch (err) {
      throw err
    }


    // try {
    //   const participant = await participants.updateParticipant(fspId,currency)


    //   if(typeof participant.errorInformation !== 'undefined' && participant.errorInformation !== null) return h.response(participant).code(participant.errorInformation.errorCode)
    //   return h.response(participant).code(200)

    // } catch (e) {
    //   console.log(e)
    //   throw e
    // }
  },

  post: async function ParticipantsByTypeAndIDPost(request, h) {
    // let configuration = await participants.getConfiguration();
    // const IDENTIFIER_REGEX = new RegExp(configuration[2].value);
    // const SUPPORTED_CURRENCY_REGEX = new RegExp(configuration[1].value);

    let fspId = request.payload.fspId;
    let currency = request.payload.currency;


    const participantSchema = Joi.object().keys({
      CURRENCY: Joi.string().regex(SUPPORTED_CURRENCY_REGEX).required(),
      FSPID: Joi.string().regex(IDENTIFIER_REGEX).length(3).required()
    });
    var response = null;
    Joi.validate(
      {
        CURRENCY: currency, FSPID: fspId
      }, participantSchema, (err, value) => {

        if (err) {
          console.log(err);
          response = err.message;
        } else {
          response = participants.createParticipant(value.FSPID, value.CURRENCY)
        }
      }
    )

    return response;

    // if(typeof response.errorInformation !== 'undefined' && response.errorInformation !== null) return h.response(response).code(response.errorInformation.errorCode)
    // return h.response(response).code(201)

  },

  delete: async function ParticipantsByTypeAndIDDelete(request, h) {
    // let configuration = await participants.getConfiguration();
    // const IDENTIFIER_REGEX = new RegExp(configuration[2].value);
    const fspId = request.params.ID;
    const participantSchema = Joi.object().keys({
      FSPID: Joi.string().regex(IDENTIFIER_REGEX).length(3).required()
    });
    var response = null;
    try {
      Joi.validate(
        {
          FSPID: fspId
        }, participantSchema, (err, value) => {
          if (err) {
            console.log(err);
            response = err.message;
          } else {
            response = participants.deleteByParticipantId(value.FSPID)
          }
        }
      )

      return response

    } catch (err) {
      throw err
    }


  }
}
