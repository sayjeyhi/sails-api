/**
 * Steps.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        title: {
            type    : 'string',
            required: true
        },
        weight: {
            type      : 'number',
            defaultsTo: 1
        },
        doing: {
            model: 'doings'
        }
    }
};
