/**
 * Track machine learning requests
 * @type {{attributes: {to: {type: string, required: boolean}, message: {type: string, required: boolean}}}}
 */
module.exports = {
    attributes: {
        source: {
            type    : 'string',
            required: true
        },
        dataSetId: {
            type: 'string'
        },
        modelId: {
            type: 'string'
        },
        predict: {
            type      : 'json',
            columnType: 'array'
        },
        user: {
            model: 'user'
        }
    }
};
