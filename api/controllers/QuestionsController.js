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
        const forSubQuestion = (!data.behaviorTypeChild || data.behaviorTypeChild === '');


        /**
         * check user info
         */
        if (!data.username){
            return res.json(
                ErrorHandler(0, 'ارسال username الزامی می‌باشد')
            );
        }

        let gatheredDate;
        const dataToHandle = { user: userInfo.id };


        /**
         * This flag will handle answering or updating answer in 24 hours
         * @type {boolean}
         */
        let couldAnswer = true;
        let lastRecord;
        const currentDateTimeStamp = new Date().getTime();

        /**
         * Check behavior type
         */
        switch (data.behaviorType){
            case 'Alcohol':
                dataToHandle.doDrink = true;
                if (forSubQuestion) {
                    dataToHandle[behaviorTypeChild] = data.answer;
                }

                // get last user_alcohol
                lastRecord = await UserAlcohol.getLastOne();
                if (lastRecord) {
                    const lastAddTime = new Date(lastRecord.submitDate).getTime();
                    couldAnswer = ((lastAddTime - currentDateTimeStamp) > (24 * 3600));
                }

                gatheredDate = await this.modifyUserAlcohol(couldAnswer, dataToHandle, lastRecord);
                break;
            case 'Smoke':
                dataToHandle.isSmoking = true;
                if (forSubQuestion) {
                    dataToHandle[behaviorTypeChild] = data.answer;
                }

                // get last user_smoke
                lastRecord = await UserSmoke.getLastOne();
                if (lastRecord) {
                    const lastAddTime = new Date(lastRecord.submitDate).getTime();
                    couldAnswer = ((lastAddTime - currentDateTimeStamp) > (24 * 3600));
                }

                gatheredDate = await this.modifyUserSmoke(couldAnswer, dataToHandle, lastRecord);
                break;
            case 'Diet':
                const userSelectedCheckBoxes = data.answer.split(',');
                dataToHandle.level = userSelectedCheckBoxes.length;
                userSelectedCheckBoxes.forEach(selected => {
                    dataToHandle[selected] = true;
                });

                gatheredDate = await this.modifyUserDiet(couldAnswer, dataToHandle, lastRecord);
                break;
            case 'Exercise':
                dataToHandle.level = data.answer;
                gatheredDate = await this.modifyUserExercise(couldAnswer, dataToHandle, lastRecord);
                break;
        }


        return res.json(
            ResponseHandler(gatheredDate)
        );
    },


    // private methods

    /**
     * Insert or update user alcohol data
     * @param isInsert
     * @param dataToHandle
     * @param lastRecord
     * @returns {Promise.<void>}
     */
    async modifyUserAlcohol(isInsert, dataToHandle, lastRecord) {
        let gatheredDate;
        if (isInsert) {
            dataToHandle.submitDate = new Date();
            gatheredDate = UserAlcohol
                .insert(
                    dataToHandle
                )
                .fetch();
        } else {
            gatheredDate = UserAlcohol
                .updateOne(
                    dataToHandle
                )
                .where({
                    id: lastRecord.id
                })
                .fetch();
        }

        return gatheredDate;
    },

    /**
     * Insert or update user alcohol data
     * @param isInsert
     * @param dataToHandle
     * @param lastRecord
     * @returns {Promise.<void>}
     */
    async modifyUserSmoke(isInsert, dataToHandle, lastRecord) {
        let gatheredDate;
        if (isInsert) {
            dataToHandle.submitDate = new Date();
            gatheredDate = UserSmoke
                .insert(
                    dataToHandle
                )
                .fetch();
        } else {
            gatheredDate = UserSmoke
                .updateOne(
                    dataToHandle
                )
                .where({
                    id: lastRecord.id
                })
                .fetch();
        }

        return gatheredDate;
    },

    /**
     * Insert or update user diet data
     * @param isInsert
     * @param dataToHandle
     * @param lastRecord
     * @returns {Promise.<void>}
     */
    async modifyUserDiet(isInsert, dataToHandle, lastRecord) {
        let gatheredDate;
        if (isInsert) {
            dataToHandle.submitDate = new Date();
            gatheredDate = UserDiet
                .insert(
                    dataToHandle
                )
                .fetch();
        } else {
            gatheredDate = UserSmoke
                .updateOne(
                    dataToHandle
                )
                .where({
                    id: lastRecord.id
                })
                .fetch();
        }

        return gatheredDate;
    },

    /**
     * Insert or update user exercise data
     * @param isInsert
     * @param dataToHandle
     * @param lastRecord
     * @returns {Promise.<void>}
     */
    async modifyUserExercise(isInsert, dataToHandle, lastRecord) {
        let gatheredDate;
        if (isInsert) {
            dataToHandle.submitDate = new Date();
            gatheredDate = UserExercise
                .insert(
                    dataToHandle
                )
                .fetch();
        } else {
            gatheredDate = UserSmoke
                .updateOne(
                    dataToHandle
                )
                .where({
                    id: lastRecord.id
                })
                .fetch();
        }

        return gatheredDate;
    }

};
