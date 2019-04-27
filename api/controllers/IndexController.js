/**
 * Show home page of our site
 * @type {{index: module.exports.index}}
 */
module.exports = {

    index(req, res) {
        res.view('pages/homepage');
    }
};
