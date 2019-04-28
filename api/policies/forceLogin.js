/**
 * Force user to login
 * @param req
 * @param res
 * @param next
 */

module.exports = async function(req, res, next){
    if (typeof req.user !== 'object') {
        // return res.redirect("/login");
        return res.status(400).json(
            ErrorHandler(1001)
        );
    }

    next();
};
