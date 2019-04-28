/**
 * UserBasicInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        doSmoke: {
            type: 'boolean',
            defaultsTo: false
        },
        cigarette: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        hookah: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        other: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        user: {
            model: 'user'
        }
    }
};
