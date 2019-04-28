/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');

/**
 * User model
 * @type {{attributes: {username: {type: string, required: boolean, unique: boolean}, password: {type: string, required: boolean}, mobile: {type: string, unique: boolean}, email: {type: string, unique: boolean}, info: {collection: string, via: string}, alcohol: {collection: string, via: string}, allergies: {collection: string, via: string}, diet: {collection: string, via: string}, disease: {collection: string, via: string}, exercise: {collection: string, via: string}, medications: {collection: string, via: string}, smoke: {collection: string, via: string}}, getUserID: (function(*): Promise), customToJSON: (function()), beforeCreate: (function(*=, *=))}}
 */
module.exports = {
    attributes: {
        username: {
            type    : 'string',
            required: false,
            unique  : true
        },
        password: {
            type    : 'string',
            required: true
        },
        mobile: {
            type  : 'string',
            unique: true
        },
        email: {
            type  : 'string',
            unique: true
        },
        info: {
            collection: 'userInfo',
            via       : 'user'
        },
        // user folder info
        alcohol: {
            collection: 'userAlcohol',
            via       : 'user'
        },
        allergies: {
            collection: 'userAllergies',
            via       : 'user'
        },
        diet: {
            collection: 'userDiet',
            via       : 'user'
        },
        disease: {
            collection: 'userDiseaseHistory',
            via       : 'user'
        },
        exercise: {
            collection: 'userExercise',
            via       : 'user'
        },
        medications: {
            collection: 'userMedications',
            via       : 'user'
        },
        smoke: {
            collection: 'userSmoke',
            via       : 'user'
        }
    },
    /**
     * Get user id from username
     * @param username
     * @returns {Promise.<Array>}
     */
    async getUserWithUsername(username) {
        const userInfo = await User
            .find({
                username
            })
            .limit('1')
            .sort('createdAt ASC')
            .catch(err =>
                sails.log(`we have little bug here , ${err.message}`));

        return userInfo ? userInfo[0] : [];
    },
    /**
     * Get user id from username
     * @param username
     * @returns {Promise.<number>}
     */
    async getUserID(username) {
        const userInfo = await User
            .find({
                username
            })
            .limit('1')
            .sort('createdAt ASC')
            .catch(err =>
                sails.log(`we have little bug here , ${err.message}`));

        return userInfo.length ? userInfo[0].id : 0;
    },
    /**
     * Omit passwords on user json
     * @returns {{}}
     */
    customToJSON() {
        return _.omit(this, ['password']);
    },
    /**
     * Call before create user document
     * @param user
     * @param cb
     */
    beforeCreate(user, cb) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) return cb(err);
                user.password = hash;
                return cb();
            });
        });
    }
};
