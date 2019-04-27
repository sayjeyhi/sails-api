/**
 * Questions.js
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

        // Add a reference to answers and categories
        answers: {
            collection: 'answers',
            via       : 'question'
        },
        categories: {
            collection: 'categories',
            via       : 'questions'
        }
    }
};
