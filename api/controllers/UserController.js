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
        await GetUserID(req, res, async(err, jwtData) => {
            if (err) {
                return res.badRequest(
                    ErrorHandler(0, err.message)
                );
            }

            const userID = jwtData.id;


            /**
             * Grab user info
             */
            const grabbedData = await User
                .findOne({
                    id: userID
                })
                .populate('info')
                .catch(err =>
                    res.badRequest(
                        ErrorHandler(0, err.message)
                    ));

            return res.json(
                ResponseHandler(grabbedData)
            );
        });
    },
    /**
     * Update user info
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async update(req, res){
        const allowedParameters = [
            'name',
            'gender',
            'weight',
            'height',
            'age'
        ];

        const data = _.pick(req.allParams(), allowedParameters);

        /**
         * Get id from jwt
         * @type {*|number}
         */
        await GetUserID(req, res, async(err, jwtData) => {
            if (err) {
                return res.badRequest(
                    ErrorHandler(0, err.message)
                );
            }

            const userID = jwtData.id;

            const userInfo = await User
                .findOne({
                    id: userID
                })
                .populate('info');

            sails.log({userInfo});

            if (userInfo.length > 0) {
                sails.log('update !!!!!!!!!!!');
                updatedUser = await UserInfo
                    .update({
                        id: userInfo[0].id
                    })
                    .set(data)
                    .catch(err =>
                        res.badRequest(ErrorHandler(0, err.message)));
            } else {
                data.user = userID;
                updatedUser = await UserInfo
                    .create(data)
                    .fetch()
                    .catch(err =>
                        res.badRequest(ErrorHandler(0, err.message)));
            }

            console.log(updatedUser);

            return res.json(
                ResponseHandler(updatedUser)
            );
        });
    },

    async getChartInfo(req, res){
        /**
         * We will use this array to fill chart data
         * @type {Array}
         */
        const chartData = [];

        /**
         * Get id from jwt
         * @type {*|number}
         */
        await GetUserID(req, res, async(err, jwtData) => {
            if (err) {
                return res.badRequest(
                    ErrorHandler(0, err.message)
                );
            }

            const userID = jwtData.id;

            const UserFullInfo = await User
                .findOne({
                    id: userID
                })
                .populate('alcohol')
                .populate('diet')
                .populate('exercise')
                .populate('smoke');

            let valueSum = 0;
            UserFullInfo.alcohol.map(d => {
                if (d.doDrink) {
                    valueSum += parseInt(d.level);
                }
            });
            chartData.push({
                quarter : 'الکل',
                valueSum: (valueSum / (UserFullInfo.alcohol.length || 1)) || 0
            });


            valueSum = 0;
            UserFullInfo.diet.map(d => {
                valueSum += parseInt(d.level);
            });
            chartData.push({
                quarter : 'رژیم غذایی',
                valueSum: (valueSum / (UserFullInfo.diet.length || 1)) || 0
            });


            valueSum = 0;
            UserFullInfo.exercise.map(d => {
                valueSum += parseInt(d.level);
            });
            chartData.push({
                quarter : 'ورزش',
                valueSum: (valueSum / (UserFullInfo.exercise.length || 1)) || 0
            });


            valueSum = 0;
            UserFullInfo.smoke.map(d => {
                if (d.doSmoke) {
                    valueSum += parseInt(d.level);
                }
            });
            chartData.push({
                quarter : 'ورزش',
                valueSum: (valueSum / (UserFullInfo.smoke.length || 1)) || 0
            });
        });

        return res.json(
            ResponseHandler(chartData, 'chart data')
        );
    },

    /**
     * Create csv to send date to bigML website
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async createCSVInfo(req, res){
        /**
         * Get id from jwt
         * @type {*|number}
         */
        let gatteredDate = [];
        await GetUserID(req, res, async(err, jwtData) => {
            if (err) {
                return res.badRequest(
                    ErrorHandler(0, err.message)
                );
            }

            const userID = jwtData.id;
            gatteredDate = await User
                .find({
                    id: userID
                })
                .populate('Alcohol')
                .populate('Diet')
                .populate('Exercise')
                .populate('Smoke')
                .catch(err =>
                    res.badRequest(ErrorHandler(0, err.message)));
        });

        /**
         * This fn will be act on data
         * @param key
         * @param value
         */
        const replacer = (key, value) => value === null ? '' : value;// specify how you want to handle null values here
        const header = Object.keys(items[0]);

        let csv = items.map(row =>
            header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));

        csv.unshift(header.join(','));
        csv = csv.join('\r\n');
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
