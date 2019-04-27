/**
 * UserPersonal.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        mobile: {
            type: 'string'
        },
        height: {
            type: 'string'
        },

        weight: {
            type      : 'string',
            columnType: 'datetime'
        },
        user: {
            model: 'user'
        }
    }
};
