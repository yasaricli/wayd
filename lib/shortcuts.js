(function() {
    var root = this;

    root.Server = function(fn) { return Meteor.isServer && fn && fn(); };
    root.Client = function(fn) { return Meteor.isClient && fn && fn(); };
}).call(this);


Client(function() {
    var root = this;

    // utils 
});
