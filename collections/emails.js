Emails = new Meteor.Collection('emails');

Emails.allow({
    insert: function() { return true; },
    update: function() { return false; },
    remove: function() { return false; }
});
