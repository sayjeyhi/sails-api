const jwtSecret = sails.config.secrets.jwtSecret;
const {sign, verify} = require('jsonwebtoken');

const JwtService = {

    issue(payload) {
        return sign(payload, jwtSecret, { expiresIn: (60 * 60 * 24) * 365 });
    },

    verify(token, callback) {
        return verify(token, jwtSecret, callback);
    }

};

module.exports = JwtService;
