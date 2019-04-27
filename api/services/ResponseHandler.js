/**
 * Create our json to print out in standard format
 * @param data
 * @param message
 * @returns {{status: boolean, message: (*|string), data: *}}
 */
const ResponseHandler = (data, message) => ({
    status : true,
    message: message || '',
    data
});

module.exports = ResponseHandler;
