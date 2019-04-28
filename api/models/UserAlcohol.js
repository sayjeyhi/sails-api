/**
 * UserAlcohol.js
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
        doDrink: {
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
        const lastRow = await UserAlcohol
            .find()
            .sort('createdAt DESC')
            .limit(1)
            .catch(err => sails.log(
                ErrorHandler(0, `We have error , ${err.message}`)
            ));

        return lastRow;
    },

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
            gatheredDate = await UserAlcohol
                .create(
                    dataToHandle
                )
                .fetch()
                .catch(err =>
                    sails.log(`we have error adding UserAlcohol , ${err.message}`));
        } else {
            delete dataToHandle.user;
            gatheredDate = await UserAlcohol
                .updateOne({
                    id: lastRecord[0].id
                })
                .set(
                    dataToHandle
                )
                .catch(err =>
                    sails.log(`we have error updating UserAlcohol , ${err.message}`));

            gatheredDate.updated = true;
        }

        return gatheredDate;
    }
};
