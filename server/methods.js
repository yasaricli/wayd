Meteor.methods({
    saveEmail: function(val) {
        var email = Emails.findOne({ email: val }),
            toEmail = val.split("@")[0] + " " + "<" + val + ">";
        if (email) { 
            throw new Meteor.Error(422, 'This email is already subscribed.' );      
        }
        // insert and send email
        Emails.insert({ created: new Date(), email: val });

        sendEmailTemplate(toEmail) ("subscribe", {
            subject: 'thanks for subscription'
        });
    }
});
