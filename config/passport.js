const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs');


passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findOne({ id }, (err, user) => {
        cb(err, user);
    });
});


passport.use(new LocalStrategy({
    usernameField: 'username',
    emailField   : 'email',
    mobileField  : 'mobile',
    passportField: 'password'
}, ((identifier, password, cb) => {
    /**
     * Check if user identifier exists
     */
    User.findOne(
        {
            or: [
                { username: identifier },
                { email: identifier },
                { mobile: identifier }
            ]
        }, (err, user) => {
            if (err) return cb(err);

            if (!user) return cb(
                null,
                false,
                ErrorHandler(1003)
            );


            /**
             * Do our comparing for user password
             */
            bcrypt.compare(password, user.password, (err, res) => {
                if (!res) return cb(
                    null,
                    false,
                    ErrorHandler(1004)
                );


                const userDetails = {
                    id       : user.id,
                    email    : user.email,
                    mobile   : user.mobile,
                    username : user.username,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    avatar   : user.avatar
                };
                return cb(
                    null,
                    userDetails,
                    {
                        status: true
                    }
                );
            });
        }
    );
})));
