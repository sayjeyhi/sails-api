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
         * Fn to check if sth has value
         */
        const hasValue = (object, entity, field) => (object[entity] ? (object[entity][field]) : false);

        if (data.username) {
            const questionsArray = dataGettered.map(question => {
                let userInfo = {};

                let selectedValue = '';
                let subQuestionsTemp;
                /**
                 * Work on alcohol drinks :)
                 */
                if (question.behaviorType === 'Alcohol') {
                    selectedValue = hasValue(userInfo, 'UserAlcohol', 'doDrink') ? 'yes' : 'no';
                    subQuestionsTemp = question.sub_questions.map(async sub => {
                        const subQuestion = { ...sub };
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
                    /**
                     * Make questions of user diet
                     */
                    question.sub_questions.map(sub => {
                        subQuestionsTemp = hasValue(userInfo, 'UserDiet', sub.behaviorTypeChild);
                    });
                } else if (question.behaviorType === 'Smoke') {
                    /**
                     * Create questions for user smoking
                     */

                    selectedValue = hasValue(userInfo, 'UserSmoke', 'doSmoke') ? 'yes' : 'no';
                    subQuestionsTemp = question.sub_questions.map(async sub => {
                        const subQuestion = { ...sub };
                        userInfo = await UserSmoke
                            .findOne({
                                user: data.username
                            })
                            .fetch()
                            .catch(err =>
                                res.json(ErrorHandler(0, err.message)));

                        subQuestion.level = userInfo[sub.behaviorTypeChild];

                        return subQuestion;
                    });
                } else if (question.behaviorType === 'Exercise') {
                    /**
                     * Create info to user exercise
                     */
                    question.sub_questions.map(sub => {
                        subQuestionsTemp = hasValue(userInfo, 'UserDiet', sub.behaviorTypeChild);
                    });
                }

                question.selectedValue = selectedValue;
                question.sub_questions = subQuestionsTemp;
            });

            /**
             * If we want to filter user info
             * we gonna return this json
             */
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

                const lastRecord = UserAlcohol.getLastOne();
                let lastAddTime;
                if(lastRecord) {

                }
                gatteredDate = UserAlcohol.insert(
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
            case 'Exercise':

                break;
        }


        return res.json(
            ResponseHandler(gatteredDate)
        );
    }
};
