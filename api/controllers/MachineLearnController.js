// const ml_info = {
//     'username': 'jafar-rezaei',
//     'apikey'  : 'd3565fba08a70168ee98504d7bb467263ef644eb',
//     '_auth'   : 'username=jafar-rezaei;api_key=d3565fba08a70168ee98504d7bb467263ef644eb'
// };
//
// const fetch = require('node-fetch');
//
//
// /**
//  * Machine learner
//  * @type {{getQuestions: (function(*, *): Promise.<*>), doAnswer: (function(*, *): Promise.<void>)}}
//  */
// module.exports = {
//
//     /**
//      * Register new user
//      * @param req
//      * @param res
//      * @returns {Promise<*>}
//      */
//     async analyze(req, res) {
//
//     }
// };
//
//
// const un = process.env.BIGML_USERNAME;
// const apiKey = process.env.BIGML_API_KEY;
// const _auth = process.env.BIGML_AUTH;
//
//
// // models
// const RecordTrackerModle = require('./models/RecordsTrackerModel');
//
//
// // mongoose
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://a_m_dev:09372741952a@cluster0-shard-00-00-qmkh4.mongodb.net:27017,cluster0-shard-00-01-qmkh4.mongodb.net:27017,cluster0-shard-00-02-qmkh4.mongodb.net:27017/mlRecords?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });
//
//
// // body parser
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
//
// // 01 - http://ml.amdev.ir/generateSource
// //      send csvFile link with this param: `csvFileUrl`
//
//
// app.post('/generateSource', async(req, res, next) => {
//     const link = req.body.csvFileUrl;
//     try {
//         const request = await fetch(`https://bigml.io/source?${_auth}`, {
//             method: 'POST',
//             body  : JSON.stringify({
//                 // remote: 'https://static.bigml.com/csv/iris.csv'
//                 remote: link // 'https://static.bigml.com/csv/diabetes.csv'
//             }),
//             headers: { 'content-type': 'application/json' }
//         });
//         const result = await request.json();
//
//
//         // save record id to mongo
//         const record = new RecordTrackerModle({
//             source: result.resource
//         });
//
//         record
//             .save()
//             .then(_rec => {
//                 res.status(201).json({
//                     // createdRecord: _rec,
//                     sourceId: result.resource
//                 });
//             })
//             .catch(err => { res.status(500).json({ mongosseError: err }); });
//     } catch (err) {
//         res.status(200).json({
//             ...err
//         });
//     }
// });
//
//
// // 02 - http://ml.amdev.ir/createDataSet
// //      previous url would give you the: `sourceId`, put it here
//
// app.get('/createDataSet', async(req, res, next) => {
//     const sourceId = req.body.sourceId;
//     try {
//         const request = await fetch(`https://bigml.io/dataset?${_auth}`, {
//             method: 'POST',
//             body  : JSON.stringify({
//                 source: sourceId
//             }),
//             headers: { 'content-type': 'application/json' }
//         });
//         const result = await request.json();
//
//         // Update record id to mongo
//         const _res = await RecordTrackerModle
//             .update(
//                 { source: sourceId }
//             ).set({
//                 dataset: result.resource
//             }).catch(err => {
//                 res.status(500).json({
//                     ...err
//                 });
//             });
//
//         res.status(200).json({
//             datasetId: result.resource
//         });
//     } catch (err) {
//         res.status(500).json({
//             ...err
//         });
//     }
// });
//
//
// // 03 - http://ml.amdev.ir/createModle
// //      previous url would give you the: `datasetId`, put it here
// app.get('/createModle', async(req, res, next) => {
//     const datasetId = req.body.datasetId;
//     try {
//         const request = await fetch(`https://bigml.io/model?${_auth}`, {
//             method: 'POST',
//             body  : JSON.stringify({
//                 dataset: datasetId
//             }),
//             headers: { 'content-type': 'application/json' }
//         });
//         const result = await request.json();
//
//         // // Update record id to mongo
//         const _res = await RecordTrackerModle
//             .update(
//                 { resource: datasetId }
//             ).set({
//                 model: result.resource
//             }).catch(err => {
//                 res.status(500).json({
//                     ...err
//                 });
//             });
//
//         res.status(200).json({
//             modelId: result.resource
//         });
//     } catch (err) {
//         res.status(500).json({
//             ...err
//         });
//     }
// });
//
//
// // 04 - http://ml.amdev.ir/predict
// //      previous url would give you the: `modelId`, put it here
// app.get('/predict', async(req, res, next) => {
//     const modelId = req.body.modelId;
//
//     try {
//         const request = await fetch(`https://bigml.io/prediction?${_auth}`, {
//             method: 'POST',
//             body  : JSON.stringify({
//                 model     : modelId,
//                 input_data: { '000000': 5, '000001': 3, '000002': 10 }
//             }),
//             headers: { 'content-type': 'application/json' }
//         });
//         const result = await request.json();
//
//         res.status(200).json({
//             ...result
//         });
//     } catch (err) {
//         res.status(500).json({
//             ...err
//         });
//     }
// });
//
//
// app.listen(4010, () => {
//     console.log('server is listening on port 3000...');
// });
