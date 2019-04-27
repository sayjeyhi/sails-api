/**
 * UserMedications.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        addict: {
            type      : 'boolean',
            defaultsTo: false
        },
        user: {
            model: 'user'
        }
    }
};
