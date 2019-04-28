const soap = require('soap')
const url = 'http://sms.sms-bartar.com/webservice/?WSDL'




module.exports = {

    async sendOne(req, res) {
        const { to, msg } = req.body
        const auth = `Basic ${new Buffer('hs-Healthika:12345123').toString('Base64')}`;
        await soap.createClient(url ,(err, client) => {
            client.addHttpHeader('Authorization', auth);
            client.send(
                { to, msg },
                async (err, response) => {

                    const _result = { to, message: msg }
                    await SmsModel
                        .create(_result)
                        .fetch()
                        .catch( err => {
                            res.badRequest({
                                msg: 'sms is not sent...',
                                err
                            })
                        })

                    return res.status(200).json({
                        msg: response,
                        err
                    })
                }                
            )
        })
    }
}
