Users = Meteor.users;

ImageStore = new FS.Store.GridFS("avatars", {
    mongoUrl: 'mongodb://selamlar:selamlar@proximus.modulusmongo.net:27017/dUr8azuq',
    maxTries: 1
});

Avatars = new FS.Collection("avatars", {
    stores: [ImageStore],
    filter: {
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png', 'jpeg']       
        }
    }
});

Avatars.allow({
    insert: function (userId, doc) {
        return doc.userId === useId;
    },
    update: function(userId, doc) {
        return doc.userId === useId;
    },
    remove: function(userId, doc) {
        return doc.userId === useId;
    },
    download: function(userId, doc) {
        return doc.userId === useId;
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
