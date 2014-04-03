(function() {
    var root = this;

    /*
    * @param {Array} emails
    * @param {Object} options { subject: '', text: '', html: ''}
    */
    root.sendEmails = function(emails, options) {
        _.forEach(emails, function(email) {
            Email.send(_.extend({
                from: 'team@wayd.in',
                to: email
            }, options));
        });    
    };

    /*
    * @param {String} email
    * @param {Object} options { subject: '', text: '', html: '' }
    */
    root.sendEmail = function(email, options) {
        // One email send
        return root.sendEmails([email], options);
    };

    /*
    * @param {String} email
    */
    root.sendEmailTemplate = function(email) {
        /*
        * @param {string} template
        * @param {object} ctx context
        * @param {object} settings 
        */
        return function(template, options) {
            var tmpl = Handlebars.templates[template],
                result = tmpl(options.ctx || {});
            // send
            sendEmail(email, _.extend({
                html: result
            }, options));
        }
    }
}).call(this);
