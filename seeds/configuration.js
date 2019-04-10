'use strict'

const configs = [
  {
    'key': 'TYPE_REGEX',
    'value': '^bankAccount$'
  },
  {
    'key': 'SUPPORTED_CURRENCY_REGEX',
    'value': '^TZS$,^USD$' 
  },
  {
    'key': 'IDENTIFIER_REGEX',
    'value': '^\ d+$'
  }
]

const seed = async function (knex) {
  try {
    return await knex('configuration').insert(configs)
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return -1001
    else {
      console.log(`Uploading seeds for currency has failed with the following error: ${err}`)
      return -1000
    }
  }
}

module.exports = {
  seed
}
