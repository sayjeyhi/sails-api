/**
 * UserBasicInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        vegetables: {
            type      : 'boolean',
            defaultsTo: false
        },
        low_sugar: {
            type      : 'boolean',
            defaultsTo: false
        },
        low_fat: {
            type      : 'boolean',
            defaultsTo: false
        },
        low_salt: {
            type      : 'boolean',
            defaultsTo: false
        },
        user: {
            model: 'user'
        }
    }
};
