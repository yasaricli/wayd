Initialize(function() {
    var _this = this;
    
    ReactPageletImages = new Mongo.Collection(null);

    // Default sessions
    Session.setDefault('pagelet', false);
    Session.setDefault('pageletClick', true);
    
    var Pagelet = {
        show: function(callback) {
            Session.set('pagelet', true);
            Session.set('pageletClick', false);
            callback && Meteor.setTimeout(callback, 200);
        },
        hide: function() {
            Session.set('pagelet', false);
            Session.set('pageletClick', true);
       }
    };
    
    Template.wayds.events({ });
    
    Template.pagelet.events({
        'click .pageletClick': function(e, t) {
            Pagelet.show(function() {
                t.find("#title").focus();
            });
        },
        'click .lightbox': function(e) {
            Pagelet.hide();
        },
        'click .share': function(e, t) {
            var text = t.find("#title").value;
            if ($.trim(text)) {
                Pagelet.hide();
                // new wayd
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
        avatar: function() {
            return Avatars.findOne({}, { sort: { uploadedAt: -1 }});
        }
    });  
});

