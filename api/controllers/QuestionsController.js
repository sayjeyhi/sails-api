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
        const allowedParameters = [
            'categories'
        ];

        const data = _.pick(req.allParams(), allowedParameters);

        const dataGettered = await Questions
            .find(data)
            .populate('answers')
            .catch(err => res.json(ErrorHandler(0, err.message)));

        return res.json(
            ResponseHandler(dataGettered)
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
            'question',
            'answer'
        ];

        const data = _.pick(req.allParams(), allowedParameters);

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
