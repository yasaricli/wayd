// Collections 
Users = Meteor.users;
Avatars = new Filo.Collection('avatars');

Users.helpers({
    avatar: function() {
        var avatar = Avatars.findOne({ userId: this._id }, { sort: { uploadedAt: -1 }});
        return avatar ? avatar : {
            uploaded: function() { return true; },
            url: function() {
                return '/defaults/default-avatar.png'
            }
        }
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
