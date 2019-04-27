/**
 * UserBasicInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        doDrink: {
            type      : 'boolean',
            defaultsTo: false
        },
        level: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        }
    }
};
