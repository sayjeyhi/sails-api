/**
 * Get current user id from jwt token
 * @param req
 * @constructor
 */
const jwtSecret = sails.config.secrets.jwtSecret;
const {verify} = require('jsonwebtoken');

const GetUserID = async(req , res) => {
    let token = req.headers.authorization;
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        await verify(
            token,
            jwtSecret,
            (err, data) => {
                return res ? res.json(ResponseHandler({err , data})) : 'wrong jwt token';
            }
        );
    } else {
        return res ? res.send(ErrorHandler(1002)) : 'NoToken';
    }
};

module.exports = GetUserID;
