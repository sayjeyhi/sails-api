/**
 * Our bigML account info
 * @type {{username: string, apikey: string, _auth: string}}
 */
const ML_INFO = {
    'username': 'jafar-rezaei',
    'apikey'  : 'd3565fba08a70168ee98504d7bb467263ef644eb',
    '_auth'   : 'username=jafar-rezaei;api_key=d3565fba08a70168ee98504d7bb467263ef644eb'
};

const fetch = require('node-fetch');


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
        const userID = await GetUserID(req).id || 0;

        sails.log({userID});
        const createTracker = await generateSource('https://static.bigml.com/csv/diabetes.csv');
        sails.log({
            createTracker
        });
    }
};


/**
 * send csvFile link with this param: `csvFileUrl`
 * @url 01 - http://ml.amdev.ir/generateSource
 * @param link
 * @returns {Promise.<void>}
 */
const generateSource = async link => {
    const request = await fetch(`https://bigml.io/source?${ML_INFO._auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            remote: link // 'https://static.bigml.com/csv/diabetes.csv'
        }),
        headers: { 'content-type': 'application/json' }
    });
    const result = await request.json();

    sails.log({ result });

    const createData = await MachineLearningTracker
        .create({
            sourceId: result.resource
        })
        .fetch()
        .catch(err =>
            sails.log(
                ErrorHandler(0, err.message)
            ));

    return createData;
};


/**
 * Pass sourceId and get datasetId
 * @param sourceId
 * @returns {Promise.<void>}
 */
const createDataSet = async sourceId => {
    const request = await fetch(`https://bigml.io/dataset?${_auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            source: sourceId
        }),
        headers: { 'content-type': 'application/json' }
    });
    const result = await request.json();

    // Update record id to mongo
    const _res = await MachineLearningTracker
        .update(
            { source: sourceId }
        ).set({
            dataset: result.resource
        }).catch(err => {
            sails.log(
                ...err
            );
        });


    dataSetId = result.resource;
};


/**
 * Put datasetId and get modelId
 * @url 03 - http://ml.amdev.ir/createModle
 * @param datasetId
 * @returns {Promise.<void>}
 */
const createModel = async datasetId => {
    const request = await fetch(`https://bigml.io/model?${_auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            dataset: datasetId
        }),
        headers: { 'content-type': 'application/json' }
    });
    const result = await request.json();

    // Update record id to mongo
    const _res = await MachineLearningTracker
        .update(
            { resource: datasetId }
        ).set({
            model: result.resource
        }).catch(err => {
            sails.log(
                ...err
            );
        });

    res.json({
        modelId: result.resource
    });
};


/**
 * Put model id and get
 * @url 04 - http://ml.amdev.ir/predict
 * @param modelId
 * @returns {Promise.<void>}
 */
const predict = async modelId => {
    const request = await fetch(`https://bigml.io/prediction?${_auth}`, {
        method: 'POST',
        body  : JSON.stringify({
            model     : modelId,
            input_data: { '000000': 5, '000001': 3, '000002': 10 }
        }),
        headers: { 'content-type': 'application/json' }
    });
    const result = await request.json();

    res.json({
        ...result
    });
};
