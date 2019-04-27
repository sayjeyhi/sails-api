/**
 * DoingDailyHistory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        did: {
            model: 'doings'
        },
        date: {
            type      : 'string',
            columnType: 'datetime'
        },
        steps: {
            model: 'steps'
        }
    }
};
