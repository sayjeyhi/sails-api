/**
 * UserBasicInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        isSmoking: {
            type: 'boolean'
        },
        cigarette: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5'],
        },
        hookah: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        pipe: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        // سیگار برگ
        cigar: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        user: {
            model: 'user'
        }
    }
};
