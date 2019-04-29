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
        const dataGettered = await Questions
            .find();

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
            'answer'
        ];
        const data = _.pick(req.allParams(), allowedParameters);
        const forSubQuestion = (data.behaviorTypeChild && data.behaviorTypeChild.trim() !== '');


        let gatheredDate;
        await GetUserID(req, res, async(err, jwtData) => {
            if (err) {
                return res.badRequest(
                    ErrorHandler(0, err.message)
                );
            }

            const userID = jwtData.id;

            /**
             * Check if user is valid
             */
            if (!userID) {
                return res.badRequest(
                    ErrorHandler(0, ' username ارسال شده معتبر نمی‌باشد')
                );
            }
            const dataToHandle = { user: userID };
            let lastRecord, couldAnswer;


            /**
             * This flag will handle answering or updating answer in 24 hours
             * @type {boolean}
             */
            const forceCouldAnswer = true;

            /**
             * This function will handle calculate insert or update
             * @param lastRecord
             */
            const handleCouldAnswer = function(lastRecord) {
                let couldAnswer = true,
                    lastAddTime;
                const currentDateTimeStamp = new Date().getTime();
                if (lastRecord && lastRecord.length > 0) {
                    lastAddTime = new Date(lastRecord.submitDate).getTime();
                    couldAnswer = ((currentDateTimeStamp - lastAddTime) > (24 * 3600));
                }

                return forceCouldAnswer ? forceCouldAnswer : couldAnswer;
            };

            /**
             * Check behavior type
             */
            switch (data.behaviorType) {
                case 'Alcohol':
                    dataToHandle.doDrink = true;
                    if (forSubQuestion) {
                        dataToHandle[data.behaviorTypeChild] = data.answer;
                    }

                    // get last user_alcohol
                    lastRecord = await UserAlcohol.getLastOne();
                    couldAnswer = handleCouldAnswer(lastRecord);

                    gatheredDate = await UserAlcohol.modifyUserAlcohol(couldAnswer, dataToHandle, lastRecord);
                    break;
                case 'Smoke':
                    dataToHandle.isSmoking = true;
                    if (forSubQuestion) {
                        dataToHandle[data.behaviorTypeChild] = data.answer;
                    }

                    // get last user_smoke
                    lastRecord = await UserSmoke.getLastOne();
                    couldAnswer = handleCouldAnswer(lastRecord);


                    gatheredDate = await UserSmoke.modifyUserSmoke(couldAnswer, dataToHandle, lastRecord);
                    break;
                case 'Diet':
                    const userSelectedCheckBoxes = data.answer ? data.answer.split(',') : [];
                    dataToHandle.level = userSelectedCheckBoxes.length;
                    userSelectedCheckBoxes.forEach(selected => {
                        dataToHandle[selected] = true;
                    });

                    // get last user_smoke
                    lastRecord = await UserDiet.getLastOne();
                    couldAnswer = handleCouldAnswer(lastRecord);


                    gatheredDate = await UserDiet.modifyUserDiet(couldAnswer, dataToHandle, lastRecord);
                    break;
                case 'Exercise':
                    dataToHandle.level = data.answer;

                    // get last user_smoke
                    lastRecord = await UserExercise.getLastOne();
                    couldAnswer = handleCouldAnswer(lastRecord);

                    gatheredDate = await UserExercise.modifyUserExercise(couldAnswer, dataToHandle, lastRecord);
                    break;
            }

            return res.json(
                ResponseHandler(gatheredDate)
            );
        });
    }

};
