/**
 * Generate response error message json
 * @param code
 * @param message
 * @returns {{status: boolean, data: null, message: string, code: *}}
 */
const ErrorHandler = (code, message = '') => {
    message = MessageHelper(code, message);
    return {
        status: false,
        data  : null,
        message,
        code
    };
};

module.exports = ErrorHandler;
