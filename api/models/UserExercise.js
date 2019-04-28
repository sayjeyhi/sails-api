/**
 * UserBasicInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
    attributes: {
        submitDate: {
            type      : 'string',
            columnType: 'datetime'
        },
        level: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        user: {
            model: 'user'
        }
    },
    /**
     * returns last row of this model
     */
    async getLastOne() {
        const lastRow = await UserExercise
            .find()
            .sort('createdAt DESC')
            .limit(1)
            .catch(err => sails.log(
                ErrorHandler(0, `We have error , ${err.message}`)
            ));

        return lastRow;
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
            gatheredDate = await UserExercise
                .create(
                    dataToHandle
                )
                .fetch()
                .catch(err =>
                    sails.log(`we have error adding UserExercise , ${err.message}`));
        } else {
            delete dataToHandle.user;
            gatheredDate = await UserSmoke
                .updateOne({
                    id: lastRecord[0].id
                })
                .set(
                    dataToHandle
                )
                .catch(err =>
                    sails.log(`we have error updating UserExercise , ${err.message}`));

            gatheredDate.updated = true;
        }

        return gatheredDate;
    }
};
