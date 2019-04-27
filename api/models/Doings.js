/**
 * Doings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        name: {
            type    : 'string',
            required: true
        },
        positive: {
            type      : 'boolean',
            defaultsTo: false
        },
        // Add a reference to steps
        doings: {
            collection: 'steps',
            via       : 'doing'
        }
    }
};
