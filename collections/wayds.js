Wayds = new Mongo.Collection('wayds');
WaydImages = new Filo.Collection('wayd_images');
WaydLikes = new Mongo.Collection('wayd_likes');
WaydComments = new Mongo.Collection("wayd_comments");

Meteor.methods({
    newWayd: function(obj) {
        var waydId = Wayds.insert(_.extend({
            userId: this.userId,
            createdAt: new Date()
        }, obj));
        return waydId;
    }
});

Wayds.helpers({
    user: function() {
        return Users.findOne({ _id: this.userId });
    },
    comments: function() {
        return Comments.find({ waydId: this._id });
    },
    images: function() {
        return WaydImages.find({ waydId: this._id }); 
    },
    likes: function() {
        return WaydLikes.find({ waydId: this._id });
    }
});

WaydLikes.helpers({
    user: function() {
        return Users.findOne({ _id: this.userId });
    },
    wayd: function() {
        return Wayds.findOne({ waydId: this.waydId });
    }
});
