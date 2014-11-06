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
                MeteorCamera.getPicture(_.extend({ allowEdit: true, quality: 75 }, options), function (error, data) {
                    var file = new FS.File(data);
                    fn(file);
                }); 
            }
            this.Helpers = function(obj) {
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
