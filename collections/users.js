Users = Meteor.users;

Avatars = new FS.Collection("avatars", {
    stores: [ 
        new FS.Store.FileSystem("avatars", { path: "~/uploads" }),
        new FS.Store.FileSystem("thumbs", {
            transformWrite: function(fileObj, readStream, writeStream) {
                gm(readStream).resize(125).stream().pipe(writeStream);                
            }
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']       
        }
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
