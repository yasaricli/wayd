(function() {
    var root = this;

    root.Server = function(fn) { return Meteor.isServer && fn && fn(); };
    root.Client = function(fn) { return Meteor.isClient && fn && fn(); };
}).call(this);


Client(function() {
    var root = this;

    // Bird ready
    root.bird = {
        show_styles: {
            "head": { top: "65px", right: "38px", opacity: '1.0' },
            "tail": { top: "171px", left: "14px", opacity: '1.0' },
            "wing": { top: "39px", left: "34px", opacity: '1.0' }
        },
        hide_styles: {
            "head": { top: "30px", right: "42px", opacity: 0 },
            "tail": { top: "171px", left: "-7px", opacity: 0 },
            "wing": { top: "20px", left: "15px", opacity: 0 }
        },
        hey: function(what, complete) { 
            var _this = this,
                styles = _this[what + "_styles"],
                fade = (what == 'show' ? 'fadeIn' : 'fadeOut'),
                layer;
            $(".body")[fade]();
            _.each(styles, function(style, cls) {
                layer = $("." + cls);
                layer.show();
                layer.animate(style, function() {
                    var last = cls == "wing";
                    // callback and self complete method
                    _this.complete.call(this); complete && complete(last);
                });
            });
        },
        complete: function() {
            var elem = $(this);
            if (elem.css('opacity') == '0') {
                elem.hide();
            }
        }
    };
});
