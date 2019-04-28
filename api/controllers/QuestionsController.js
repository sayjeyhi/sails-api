/**
 * Questions controller
 * @type {{getQuestions: (function(*, *): Promise.<*>), doAnswer: (function(*, *): Promise.<void>)}}
 */
module.exports = {

    /**
     * Register new user
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async getQuestions(req, res) {
        const allowedParameters = [
            'username'
        ];
        const data = _.pick(req.allParams(), allowedParameters);
        const dataGettered = await Questions
            .find();


        /**
         * Check if has value
         */
        const hasValue = (object, entity, field) => (object[entity] ? (object[entity][field]) : false);

        if (data.username) {
            const questionsArray = dataGettered.map(question => {

                let userInfo = {};

                let selectedValue = '';
                let subQuestionsTemp;
                if (question.behaviorType === 'Alcohol') {
                    selectedValue = hasValue(userInfo, 'UserAlcohol', 'doDrink') ? 'yes' : 'no';
                    subQuestionsTemp = question.sub_questions.map(async sub => {
                        const subQuestion = {...sub};
                        userInfo = await UserAlcohol
                            .findOne({
                                user: data.username
                            })
                            .fetch()
                            .catch(err =>
                                res.json(ErrorHandler(0, err.message)));

                        subQuestion.level = userInfo[sub.behaviorTypeChild];

                        return subQuestion;
                    });
                } else if (question.behaviorType === 'Diet') {
                    question.sub_questions.map(sub => {
                        subQuestionsTemp = hasValue(userInfo, 'UserDiet', sub.behaviorTypeChild);
                    });
                } else if (question.behaviorType === 'Smoke') {
                    selectedValue = hasValue(userInfo, 'UserSmoke', 'doSmoke') ? 'yes' : 'no';
                    question.sub_questions.map(sub => {
                        subQuestionsTemp = hasValue(userInfo, 'UserSmoke', sub.behaviorTypeChild);
                    });
                } else if (question.behaviorType === 'Exercise') {
                    question.sub_questions.map(sub => {
                        subQuestionsTemp = hasValue(userInfo, 'UserDiet', sub.behaviorTypeChild);
                    });
                }

                question.selectedValue = selectedValue;
                question.sub_questions = subQuestionsTemp;
            });

            return res.json(
                ResponseHandler(questionsArray, 'list of questions')
            );
        }


        return res.json(
            ResponseHandler(dataGettered, 'list of questions')
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
            'answer',
            'username'
        ];
        const data = _.pick(req.allParams(), allowedParameters);
        const modelCaller = `User${data.behaviorType}`;
        const forSubQuestion = (!data.behaviorTypeChild || data.behaviorTypeChild === '');


        /**
         * check user info
         */
        if (!data.username){
            return res.json(
                ErrorHandler(0, 'ارسال username الزامی می‌باشد')
            );
        }

        const userInfo = User.find({
            username: data.username
        }).populate(modelCaller);

        let gatteredDate;
        const hasData = user[modelCaller].length > 0;
        const operation = hasData ? 'update' : 'create';
        const dataToHandle = { user: userInfo.id };


        /**
         * Check behavior type
         */
        switch (data.behaviorType){
            case 'Alcohol':
                dataToHandle.doDrink = true;
                if (forSubQuestion) {
                    dataToHandle[behaviorTypeChild] = data.answer;
                }

                gatteredDate = UserAlcohol[operation](
                    dataToHandle
                );
                break;
            case 'Smoke':
                dataToHandle.isSmoking = true;
                if (forSubQuestion) {
                    dataToHandle[behaviorTypeChild] = data.answer;
                }
                gatteredDate = UserSmoke[operation](
                    dataToHandle
                );
                break;
            case 'Diet':

                break;
        }


        return res.json(
            ResponseHandler(gatteredDate)
        );
    }
};
