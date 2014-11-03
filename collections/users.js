Users = Meteor.users;

Avatars = new FS.Collection("avatars", {
    stores: [new FS.Store.FileSystem("avatars", { path: "~/uploads" })]
});

Users.helpers({
    wayds: function() {
        return Wayds.find({ userId: this._id }, { sort: { createdAt: -1 }});
    }
});

Meteor.methods({
    updateSessionUser: function(obj) {
        Users.update({
            _id: this.userId
        }, { $set: _.extend({
            // current default property:val
        }, obj)});
    }
});
