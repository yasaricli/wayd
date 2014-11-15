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
        },
        {
            find: function(wayd) {
                return WaydImages.find({ waydId: wayd._id });
            }
        },
        {
            find: function(wayd) {
                return WaydLikes.find({ waydId: wayd._id });
            },
            children: [
                {
                    find: function(like, wayd) {
                        return Users.find({ _id: like.userId });
                    }
                },
                {
                    find: function(like) {
                        return Avatars.find({ userId: like.userId });
                    }
                }    
            ]
        }
    ]
});
