
Meteor.methods({
    newEmail: function(val) {
        var email = Emails.findOne({ email: val });
        console.log(email, val);
        if (email) { 
            throw new Meteor.Error(422, 'This email is already subscribed.' );      
        }
        Emails.insert({
            created: new Date(),
            email: val
        });
    }
});
