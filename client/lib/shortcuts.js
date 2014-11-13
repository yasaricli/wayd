(function() {
    /*
    * 
    * Use 
    * Initialize(function() { 
    *     this.helpers({
            // default helpers
          });
    * });
    */
    var root = this,
        InitializeCtx = function() {
            var _this = this;

            // Cordova utils shortcuts
            _this.takePhoto = function(options, fn) {
                MeteorCamera.getPicture(_.extend({ quality: 99 }, options), function (error, data) {
                    var file = new Filo.File(data);
                    file.userId = Meteor.userId();
                    fn(file);
                }); 
            };

            _this.openPhotoLibrary = function(fn) {
                this.takePhoto({ 
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                }, fn);
            };

            _this.lightbox = {
                show: function(call) {
                    Session.set('lightbox', true);
                    call && call();
                },
                hide: function(call) {
                    Session.set('lightbox', false);
                    Session.set('pagelet', false);
                    Session.set('pageletClick', true);
                    call && call();
                }
            };

            Template.lightbox.events({
                'click .lightbox': function() {
                    _this.lightbox.hide();
                }
            });

            _this.Helpers = function(obj) {
                _.each(obj, function(fn, name) { Template.registerHelper(name, fn); });
            };
        };
    
    root.Initialize = function(callback) {
   
        // callback prototype change
        callback.prototype = new InitializeCtx();
    
        // new Object callback
        var Obj = new callback();
    };

}).call(this);
