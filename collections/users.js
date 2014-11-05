var Stores = {};

// set stores
Stores.Avatars = new FS.Store.GridFS("avatars", {
    mongoUrl: 'mongodb://selamlar:selamlar@proximus.modulusmongo.net:27017/dUr8azuq',
    maxTries: 1
});

// Collections 
Users = Meteor.users;
Avatars = new FS.Collection("avatars", { stores: [Stores.Avatars] });

// users helpers property
Users.helpers({});

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
