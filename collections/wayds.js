Wayds = new Mongo.Collection("wayds");

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
    }
});
