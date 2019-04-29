/**
 * To call fetch api in node env
 * @type {fetch}
 */
const fetch = require('node-fetch');

/**
 * Our bigML account info
 * @type {{username: string, apikey: string, auth: string}}
 */
const ML_INFO = {
    'username': 'jafar-rezaei',
    'apikey'  : 'd3565fba08a70168ee98504d7bb467263ef644eb',
    'auth'    : 'username=jafar-rezaei;api_key=d3565fba08a70168ee98504d7bb467263ef644eb'
};


/**
 * Machine learner
 * @type {{getQuestions: (function(*, *): Promise.<*>), doAnswer: (function(*, *): Promise.<void>)}}
 */
module.exports = {

    /**
     * Register new user
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async analyze(req, res) {
        await GetUserID(req, res, async(err, jwtData) => {
            if (err) {
                return res.badRequest(
                    ErrorHandler(0, err.message)
                );
            }

            const userID = jwtData.id;

            const sourceId = await generateSource('https://static.bigml.com/csv/diabetes.csv');
            const dataSetId = await createDataSet(sourceId);
            const modelId = await createModel(dataSetId);
            const predict = await makePredict(modelId);

            sails.log({
                source: sourceId,
                user  : userID,
                dataSetId,
                modelId,
                predict
            });
            const saveResource = await saveField({
                source: sourceId,
                user  : userID,
                dataSetId,
                modelId,
                predict
            });


            sails.log({
                saveResource
            });

            return res.json(saveResource);
        });

    }
};

/**
 * Save field on ML tracker
 * @param isInsert
 * @param data
 * @param where
 * @returns {Promise.<*>}
 */
const saveField = async data => {
    const grabbedData = await MachineLearningTracker
        .create(
            data
        )
        .fetch()
        .catch(err =>
            sails.log(
                ErrorHandler(0, err.message)
            ));


    return grabbedData;
};

/**
 * Save field on ML tracker
 * @param data
 * @returns {Promise.<*>}
 */
const updateRow = async data => {
    const grabbedData = await MachineLearningTracker
        .update(where)
        .set(data)
        .catch(err =>
            sails.log(
                ErrorHandler(0, err.message)
            ));


    return grabbedData;
};


/**
 * Send csvFile link with this param: `csvFileUrl`
 * @url 01 - http://ml.amdev.ir/generateSource
 * @param link
 * @returns {Promise.<void>}
 */
const generateSource = async link => {
    const request = await fetch(`https://bigml.io/source?${ML_INFO.auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            remote: link
        }),
        headers: { 'content-type': 'application/json' }
    });
    const result = await request.json();

    return result.resource;
};


/**
 * Pass sourceId and get datasetId
 * @param sourceId
 * @returns {Promise.<void>}
 */
const createDataSet = async sourceId => {
    const request = await fetch(`https://bigml.io/dataset?${ML_INFO.auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            source: sourceId
        }),
        headers: { 'content-type': 'application/json' }
    });
    const result = await request.json();

    return result.resource;
};


/**
 * Put datasetId and get modelId
 * @url 03 - http://ml.amdev.ir/createModle
 * @param datasetId
 * @returns {Promise.<void>}
 */
const createModel = async datasetId => {
    const request = await fetch(`https://bigml.io/model?${ML_INFO.auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            dataset: datasetId
        }),
        headers: { 'content-type': 'application/json' }
    });
    const result = await request.json();

    sails.log({model : result});

    return result.resource;
};


/**
 * Put model id and get predict
 * @url 04 - http://ml.amdev.ir/predict
 * @param modelId
 * @returns {Promise.<void>}
 */
const makePredict = async modelId => {
    const request = await fetch(`https://bigml.io/prediction?${ML_INFO.auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            model     : modelId,
            input_data: { '000000': 5, '000001': 3, '000002': 10 }
        }),
        headers: { 'content-type': 'application/json' }
    });
    const predict = await request.json();

    return predict;
};
