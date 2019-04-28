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
        doSmoke: {
            type      : 'boolean',
            defaultsTo: false
        },
        cigarette: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        hookah: {
            type: 'string',
            isIn: ['', '1', '2', '3', '4', '5']
        },
        other: {
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
        const lastRow = await UserSmoke
            .find()
            .sort('createdAt DESC')
            .limit(1)
            .catch(err => sails.log(
                ErrorHandler(0, `We have error , ${err.message}`)
            ));

        return lastRow;
    }
};
