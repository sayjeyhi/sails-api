/**
 * Questions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        behaviorType: {
            type    : 'string',
            required: false,
            isIn    : ['Alcohol', 'Allergies', 'Diet', 'DiseaseHistory', 'Exercise', 'Medications', 'Smoke']
        },
        kind: {
            type    : 'string',
            required: true
        },
        askSubAt: {
            type      : 'string',
            defaultsTo: 'yes'
        },
        title: {
            type    : 'string',
            required: true
        },
        answers: {
            type      : 'json',
            columnType: 'array'
        },
        sub_questions: {
            type      : 'json',
            columnType: 'array'
        }
    }
};
