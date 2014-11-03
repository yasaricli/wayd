Wayds = new Mongo.Collection("wayds");
Comments = new Mongo.Collection("comments");

Meteor.methods({
    newWayd: function(obj) {
        Wayds.insert(_.extend({
            userId: this.userId,
            createdAt: new Date()
        }, obj));
    }
});

Wayds.helpers({
    user: function() {
        return Users.findOne({ _id: this.userId });
    },
    comments: function() {
        return Comments.find({ waydId: this._id });
    }
});
