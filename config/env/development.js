
module.exports = {




    models: {
        migrate: 'safe'
    },


    /** ************************************************************************
     *                                                                         *
     * Always disable "shortcut" blueprint routes.                             *
     *                                                                         *
     * > You'll also want to disable any other blueprint routes if you are not *
     * > actually using them (e.g. "actions" and "rest") -- but you can do     *
     * > that in `config/blueprints.js`, since you'll want to disable them in  *
     * > all environments (not just in production.)                            *
     *                                                                         *
     ***************************************************************************/
    blueprints: {
        shortcuts: false
    },

    session: {
        cookie: {
            // secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    },


    log: {
        level: 'debug'
    },


    http: {
        cache: 365.25 * 24 * 60 * 60 * 1000 // One year
    },


    /** ************************************************************************
     *                                                                         *
     * Lift the server on port 80.                                             *
     * (if deploying behind a proxy, or to a PaaS like Heroku or Deis, you     *
     * probably don't need to set a port here, because it is oftentimes        *
     * handled for you automatically.  If you are not sure if you need to set  *
     * this, just try deploying without setting it and see if it works.)       *
     *                                                                         *
     ***************************************************************************/
    port: 8023,


    /** ************************************************************************
     *                                                                         *
     * Configure an SSL certificate                                            *
     *                                                                         *
     * For the safety of your users' data, you should use SSL in production.   *
     * ...But in many cases, you may not actually want to set it up _here_.    *
     *                                                                         *
     * Normally, this setting is only relevant when running a single-process   *
     * deployment, with no proxy/load balancer in the mix.  But if, on the     *
     * other hand, you are using a PaaS like Heroku, you'll want to set up     *
     * SSL in your load balancer settings (usually somewhere in your hosting   *
     * provider's dashboard-- not here.)                                       *
     *                                                                         *
     * > For more information about configuring SSL in Sails, see:             *
     * > https://sailsjs.com/config/*#?sailsconfigssl                          *
     *                                                                         *
     **************************************************************************/
    // ssl: undefined,


    /** ************************************************************************
     *                                                                         *
     * Production overrides for any custom settings specific to your app.      *
     * (for example, production credentials for 3rd party APIs like Stripe)    *
     *                                                                         *
     * > See config/custom.js for more info on how to configure these options. *
     *                                                                         *
     ***************************************************************************/
    custom: {
        baseUrl             : 'https://example.com',
        internalEmailAddress: 'support@example.com'

        // mailgunDomain: 'mg.example.com',
        // mailgunSecret: 'key-prod_fake_bd32301385130a0bafe030c',
        // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
        // --------------------------------------------------------------------------
        // /\   OR, to avoid checking them in to version control, you might opt to
        // ||   set sensitive credentials like these using environment variables.
        //
        // For example:
        // ```
        // sails_custom__mailgunDomain=mg.example.com
        // sails_custom__mailgunSecret=key-prod_fake_bd32301385130a0bafe030c
        // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
        // ```
        // --------------------------------------------------------------------------

    }


};
