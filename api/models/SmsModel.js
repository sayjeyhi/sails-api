/**
 * SMS messages model
 * @type {{attributes: {to: {type: string, required: boolean}, message: {type: string, required: boolean}}}}
 */
module.exports = {
    attributes: {
        to: {
            type    : 'string',
            required: true
        },
        message: {
            type    : 'string',
            required: true
        }
    }
};
