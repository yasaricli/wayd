Users = Meteor.users;
Avatars = new FS.Collection("avatars", {
    stores: [new FS.Store.FileSystem("avatars", { path: "~/uploads" })]
});
Users.helpers({
    wayds: function() {
        return Wayds.find({ userId: this._id }, { sort: { createdAt: -1 }});
    }
});
