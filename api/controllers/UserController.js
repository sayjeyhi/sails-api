/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { sign, verify } = require('jsonwebtoken');
const jwtSecret = sails.config.secrets.jwtSecret;


module.exports = {
    /**
     * Register new user
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async register(req, res) {
        const allowedParameters = [
            'email',
            'password',
            'firstName',
            'lastName',
            'username'
        ];

        const data = _.pick(req.body, allowedParameters);

        const createdUser = await User
            .create(data)
            .fetch()
            .catch(err => res.json(ErrorHandler(0, err.message)));

        const responseData = {
            user : createdUser,
            token: JwtService.issue({ id: createdUser.id })
        };

        return res.json(
            ResponseHandler(responseData)
        );
    },
    /**
     * Init user app
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async init(req, res){
        let token = req.headers.authorization;
        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }

            /**
             * Verify user jwt token and grab user
             */
            await verify(
                token,
                jwtSecret,
                async(err, data) => {
                    const grabbedUser = await User
                        .findOne({
                            id: data.id
                        });

                    res ? res.json(
                        ResponseHandler({ ...grabbedUser })
                    ) : 'wrong jwt token';
                }
            );
        } else {
            return res ? res.send(
                ErrorHandler(1002)
            ) : 'NoToken';
        }
    }

};
