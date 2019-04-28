/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /** *************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/'             : { view: 'pages/homepage' },
    'GET /csrfToken': { action: 'security/grant-csrf-token' },

    // Login/Register routes
    'POST /login'   : 'AuthController.login',
    'POST /register': 'UserController.register',
    'POST /app_init': 'UserController.init',


    // for history
    'GET /questions': 'QuestionsController.getQuestions',
    'POST /doAnswer': 'QuestionsController.doAnswer',


    'POST /analyzeData': 'MachineLearnController.analyze',

    // for socket
    'GET /joinRoom' : 'AppSocket.join',
    'GET /appSocket': 'AppSocket.appChanged',


    // SMS Handler
    'POST /sendOne' : 'SmsController.sendOne',
};
