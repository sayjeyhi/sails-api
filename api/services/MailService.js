const nodeMailer = require('nodemailer');
const h2p = require('html2plaintext');

const
    localMailOption = {
        host  : '200.200.200.209',
        port  : 25,
        secure: false,
        auth  : {
            user: 'lavaei@software.net', // This part will use as mail sender
            pass: '123456'
        }
    },
    serverMailOption = {
        host      : 'mail.torfehnegar.ir',
        port      : 25,
        requireTLS: true, // Force TLS
        secure    : false,
        auth      : {
            user: 'swrequest@torfehnegar.ir', // This part will use as mail sender
            pass: 'swr@254#'
        },
        rejectUnauthorized: false,
        tls               : {
            rejectUnauthorized: false
        }
    },
    isLocal = true;

let fromSender = '';
const senderName = 'کارریز';
let mailOption = '';

const MailService = {

    /**
     * Initialize mailer
     * @param maileInfo
     */
    mailerInit(mailerInfo) {
        const transporter = nodeMailer.createTransport({
            host  : mailerInfo.host,
            port  : mailerInfo.port,
            secure: false,
            auth  : {
                user: mailerInfo.auth.user,
                pass: mailerInfo.auth.pass
            }
        });

        return transporter;
    },

    /**
     * Send email promise
     * @param item
     * @returns {*}
     */
    sendMail(item) {
        if (isLocal) {
            fromSender = localMailOption.auth.user;
            mailOption = localMailOption;
        } else {
            fromSender = serverMailOption.auth.user;
            mailOption = serverMailOption;
        }

        // Create mail object
        const sendMailOptions = {
            from       : `<${fromSender}> ${senderName}`, // sender address
            to         : item.receiver, // list of receivers // 'rezaei.jafar@software.net'
            subject    : item.subject, // Subject line
            html       : item.message, // html body
            text       : h2p(item.message),
            attachments: null
        };

        // Init the mail Sender
        const transporter = this.mailerInit(mailOption);

        // start running promise
        return transporter.sendMail(sendMailOptions);
    }
};

module.export = MailService;
