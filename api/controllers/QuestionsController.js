const {sign, verify} = require('jsonwebtoken');
const jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {

    /**
     * Register new user
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getQuestions(req, res) {
        const dataGettered = await Questions
            .find();


        return res.json(
            ResponseHandler(dataGettered , 'list of questions')
        );
    },
    /**
     * Get list|one of question categories info
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async doAnswer(req, res) {
        const allowedParameters = [
            'behaviorType',
            'behaviorTypeChild',
            'answer'
        ];
        const data = _.pick(req.allParams(), allowedParameters);


        if(
            !data.behaviorTypeChild
            || data.behaviorTypeChild === ''
        ) {

        }
        const categoriesData = await Categories
            .find(data)
            .catch(err => res.json(
                ErrorHandler(0, err.message)
            ));


        return res.json(
            ResponseHandler(categoriesData)
        );
    }
};
