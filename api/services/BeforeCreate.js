/**
 * Add extra attributes on data that we want to create
 * @param data
 * @param req
 */
const BeforeCreate = (data, req) => {
    data.creator = GetUserID(req); // add user id
    const appID = req.allParams().app || null;
    if (appID) {
        data.app = appID; // add app id
    }

    return data;
};

module.exports = BeforeCreate;
