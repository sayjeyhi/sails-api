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
        vegetables: {
            type      : 'boolean',
            defaultsTo: false
        },
        low_sugar: {
            type      : 'boolean',
            defaultsTo: false
        },
        low_fat: {
            type      : 'boolean',
            defaultsTo: false
        },
        low_salt: {
            type      : 'boolean',
            defaultsTo: false
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
        const lastRow = await UserDiet
            .find()
            .sort('createdAt DESC')
            .limit(1)
            .catch(err => sails.log(
                ErrorHandler(0, `We have error , ${err.message}`)
            ));

        return lastRow;
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
            gatheredDate = await UserDiet
                .create(
                    dataToHandle
                )
                .fetch()
                .catch(err =>
                    sails.log(`we have error adding UserDiet , ${err.message}`));
        } else {
            delete dataToHandle.user;
            if (typeof dataToHandle === 'undefined'){
                return lastRecord;
            }
            gatheredDate = await UserSmoke
                .updateOne({
                    id: lastRecord[0].id
                })
                .set(
                    dataToHandle
                )
                .catch(err =>
                    sails.log(`we have error updating UserDiet , ${err.message}`));

            gatheredDate.updated = true;
        }

        return gatheredDate;
    }
};
