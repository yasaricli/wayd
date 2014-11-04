Users = Meteor.users;

ImageStore = new FS.Store.GridFS("images", {
    mongoUrl: 'mongodb://selamlar:selamlar@proximus.modulusmongo.net:27017/dUr8azuq',
    maxTries: 1,
    chunkSize: 1024*1024
});

Avatars = new FS.Collection("avatars", {
    stores: [ImageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']       
        }
    }
});

Avatars.allow({
    insert: function (userId, doc) {
        if (userId == doc.userId) return true;
    },
    update: function(userId, doc) {
        if (userId == doc.userId) return true;
    },
    download: function(userId, doc) {
        return true;
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
