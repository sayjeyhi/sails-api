/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {
    // sails.jwt = require('jsonwebtoken');
    // const Crypptr = require('cryptr');
    // sails.crypt = new Crypptr('FarhadLavaei@123#');

    // By convention, this is a good place to set up fake data during development.
    //
    // For example:
    // ```
    // // Set up fake development data (or if we already have some, avast)
    // if (await User.count() > 0) {
    //   return;
    // }
    //
    // await User.createEach([
    //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
    //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
    //   // etc.
    // ]);
    // ```


    // console.log('CREATING DATABASE INDEX BY HAND');
    // // USER MODEL
    // const db = User.getDatastore().manager;
    // await db.collection(User.tableName).createIndex({ email: 1 }, { unique: true });
    // await db.collection(User.tableName).createIndex({ username: 1 }, { unique: true });
    //
    // // await initializeDatabase() // custom DB initialization...
    //
    // return done();
};
