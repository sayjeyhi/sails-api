/**
 * UserBasicInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        sex: {
            type: 'string',
            isIn: ['male', 'female']
        },
        birth_date: {
            type      : 'string',
            columnType: 'datetime'
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
