/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');

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
            type    : 'string',
            unique  : true
        },
        basicInfo: {
            collection: 'userBasicInfo',
            via       : 'user'
        },
        personalInfo: {
            collection: 'userPersonal',
            via       : 'user'
        },
        allergies: {
            collection: 'userAllergies',
            via       : 'user'
        },
        medications: {
            collection: 'userMedications',
            via       : 'user'
        }
    },

    customToJSON() {
        return _.omit(this, ['password']);
    },
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
