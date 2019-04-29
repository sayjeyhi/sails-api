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
        gender: {
            type: 'string',
            isIn: ['male', 'female']
        },
        age: {
            type: 'string'
        },
        height: {
            type: 'string'
        },
        weight: {
            type: 'string'
        },
        user: {
            model: 'user'
        }
    }
};
