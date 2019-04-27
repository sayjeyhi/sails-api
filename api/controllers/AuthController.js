/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {

    login(req, res) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                // custom error handling
                return res.send(ErrorHandler(0, err.message));
            } else if (!info.status){
                return res.send(info);
            }


            req.logIn(user, err => {
                if (err) return res.send(ErrorHandler(0, err.message));

                console.log("USER LOGGED");

                return res.json(
                    ResponseHandler(
                        {
                            code : 200,
                            user,
                            token: JwtService.issue({ id: user.id })
                        },
                        info.message
                    )
                );
            });
        })(req, res);
    },

    logout(req, res) {
        req.logout();
        return res.json(ResponseHandler(0, 'Logout successful'));
        // res.redirect('/');
    }
};
