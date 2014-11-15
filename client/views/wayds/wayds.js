Initialize(function() {
    var _this = this,
        ReactPageletImages = new Mongo.Collection(null);

    // Default sessions
    Session.setDefault('pagelet', false);
    Session.setDefault('pageletClick', true);
   
    Template.wayds.events({ 
        'click .likeButton': function(e, t) {
            Meteor.call('newWaydLike', this._id);
        }  
    });
    
    Template.pagelet.events({
        'click .pageletClick': function(e, t) {
            _this.lightbox.show(function() {
                Session.set('pagelet', true);
                Session.set('pageletClick', false);
            });
        },
        'click .share': function(e, t) {
            var text = t.find("#title").value;
            if ($.trim(text)) {
                _this.lightbox.hide(function() {
                    Meteor.call('newWayd', { text: text }, function(err, waydId) {
                        if (!err) {
                            // save and remove images
                            ReactPageletImages.find().forEach(function(img) {
                                var image = new Filo.File(img.data);
                                image.waydId = waydId;
                                WaydImages.insert(image, function() {
                                    // react removed.
                                    ReactPageletImages.remove(img._id);
                                });
                            });
                        }
                    });
                });
            }
        },
        'click .photo': function(e, t) {
            _this.openPhotoLibrary(function(data) {
                ReactPageletImages.insert(data);
            });
        }
    });
    
    Template.pagelet.helpers({
        pageletImages: function() {
            return ReactPageletImages.find({});
        }
    });

    Template.wayds.helpers({
        wayds: function() {
            return Wayds.find({}, { sort: { createdAt: -1 }});
        },
        hasLike: function() {
            return !!WaydLikes.findOne({ userId: Meteor.userId(), waydId: this._id });
        }
    });  
});

