module.exports = async function(req, res, proceed) {
    let token = req.headers.authorization;
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        await JwtService.verify(token, err => {
            if (!err) {
                proceed();
            } else {
                return res.badRequest(
                    ErrorHandler(0, err.message)
                );
            }
        });
    } else {
        return res.badRequest(
            ErrorHandler(1002)
        );
    }
};
