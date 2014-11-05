Users = Meteor.users;

ImageStore = new FS.Store.GridFS("avatars", {
    mongoUrl: 'mongodb://selamlar:selamlar@proximus.modulusmongo.net:27017/dUr8azuq',
    maxTries: 1
});

Avatars = new FS.Collection("avatars", {
    stores: [ImageStore],
    filter: {
        maxSize: 5242880, // 5mb
        allow: { contentTypes: ['image/*'], extension: ['jpg', 'png'] }
    }
});

Avatars.allow({
    insert: function (userId, doc) {
        return doc.userId === userId;
    },
    update: function(userId, doc) {
        return doc.userId === userId;
    },
    remove: function(userId, doc) {
        return doc.userId === userId;
    },
    download: function(userId, doc) {
        return doc.userId === userId;
    }
});

Users.helpers({});

Meteor.methods({
    updateSessionUser: function(obj) {
        Users.update({
            _id: this.userId
        }, { $set: _.extend({
            // current default property:val
        }, obj)});
    }
});
