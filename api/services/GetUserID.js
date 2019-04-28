/**
 * Get current user id from jwt token
 * @param req
 * @constructor
 */
const jwtSecret = sails.config.secrets.jwtSecret;
const { verify } = require('jsonwebtoken');

const GetUserID = async(req, res , fn) => {
    let token = req.headers.authorization;
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        await verify(
            token,
            jwtSecret,
            fn
        );
    } else {
        sails.log('NoToken supplied');
    }
};

module.exports = GetUserID;
