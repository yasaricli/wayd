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
        */
        return function(template, ctx) {
            var tmpl = Handlebars.templates[template],
                result = tmpl(ctx);
            // send
            sendEmail(email, {
                subject: 'thanks for subscription',
                html: result
            });
        }
    }
}).call(this);
