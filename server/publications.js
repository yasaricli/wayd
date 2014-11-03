Meteor.publishComposite('session', {
    find: function() {
        return Users.find({ _id: this.userId });
    },
    children: [
        {
            find: function(user) {
                return Avatars.find({ userId: user._id });
            }
        }
    ]
});

Meteor.publishComposite('wayds', {
    find: function() {
        return Wayds.find({ });
    },
    children: [
        {
            find: function(wayd) {
                return Users.find({ _id: wayd.userId });
            }
        },
        {
            find: function(wayd) {
                return Avatars.find({ userId: wayd.userId });
            }
        }
    ]
});
