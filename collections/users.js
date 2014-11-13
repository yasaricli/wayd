// Collections 

Users = Meteor.users;
Avatars = new Filo.Collection('avatars');

Users.helpers({
    avatar: function() {
        return Avatars.findOne({ userId: this._id });
    }
});

// methods
Meteor.methods({
    updateSessionUser: function(obj) {
        Users.update({
            _id: this.userId
        }, { $set: _.extend({
            // current default property:val
        }, obj)});
    }
});
