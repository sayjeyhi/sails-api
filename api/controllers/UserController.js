/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { verify } = require('jsonwebtoken');
const jwtSecret = sails.config.secrets.jwtSecret;

/**
 * Generates random numb
 * @param max
 * @returns {number}
 */
const getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

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
            'username'
        ];
        const data = _.pick(req.body, allowedParameters);
        let createdUser = await User.getUserWithUsername(data.username);

        if (!createdUser || createdUser.length === 0) {
            // for now , we skipped login process
            data.password = getRandomInt(9999999);
            createdUser = await User
                .create(data)
                .fetch()
                .catch(err =>
                    res.badRequest(
                        ErrorHandler(0, err.message)
                    ));
        }

        const responseData = {
            user : createdUser,
            token: JwtService.issue({ id: createdUser.id })
        };

        return res.json(
            ResponseHandler(responseData)
        );
    },
    /**
     * Register new user
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async profile(req, res) {
        /**
         * Get id from jwt
         * @type {*|number}
         */
        const userID = await GetUserID(req, res).id || 0;

        /**
         * Grab user info
         */
        const grabbedData = await User
            .findOne({
                id: userID
            })
            .populate('userInfo')
            .fetch()
            .catch(err =>
                res.badRequest(
                    ErrorHandler(0, err.message)
                ));

        return res.json(
            ResponseHandler(grabbedData)
        );
    },
    /**
     * Update user info
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async update(req, res){
        /**
         * Get id from jwt
         * @type {*|number}
         */
        const userID = await GetUserID(req, res).id || 0;

        const allowedParameters = [
            'name',
            'gender',
            'weight',
            'height',
            'birth_date'
        ];


        const data = _.pick(req.allParams(), allowedParameters);
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
                        })
                        .populate('UserBasicInfo')
                        .populate('UserPersonal');

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
