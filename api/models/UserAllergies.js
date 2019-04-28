/**
 * UserAllergies.js
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
        name: {
            type  : 'string',
            unique: true
        },
        user: {
            model: 'user'
        }
    },
    /**
     * returns last row of this model
     */
    async getLastOne() {
        const lastRow = await UserAllergies
            .find()
            .sort('createdAt DESC')
            .limit(1)
            .catch(err => sails.log(
                ErrorHandler(0, `We have error , ${err.message}`)
            ));

        return lastRow;
    }
};
