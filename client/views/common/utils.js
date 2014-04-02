(function() {
    var root = this;

    // index rednered function 
    root.index_rendered = function() {
        // bird show;
        bird.hey('show', function(last) {
            if (last) {
                $(".anim-logo").animate({ left: '-300px'}, function() {
                    $(".sub").animate({ opacity: '.9', left: '290px'}, function() {
                        setTimeout(function() {
                            $("#id_email").focus();
                        }, 100);
                    });
                }); 
            }
        });
    };

    // subscribe Valid form
    root.subscribeForm = function(fn) {
        var email = $("#id_email");
        if (!$.trim(email.val()) || !validateEmail(email.val())) {
            email.addClass("invalid").focus();
            return;
        };
        Meteor.call('newEmail', email.val(), function(err) {
            if (err) { Session.set("err", err.reason); return; }
            email.removeClass("invalid");
            bird.hey('hide', function(last) {
                if (last) {
                    $(".sub").animate({ opacity: '0', left: '0'}, function() {
                        $(".anim-logo").removeAttr("style");
                        fn && fn(email.val());
                        $(".ok").removeClass("hidden");
                    });
                }
            });
        });
    };


}).call(this);
