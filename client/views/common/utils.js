(function() {
    var root = this;

    // index rednered function 
    root.index_rendered = function() {
        // bird show;
        bird.hey('show', function(last) {
            if (last) {
                $(".anim-logo").animate({ left: '-300px'}, function() {
                    $(".sub").animate({ opacity: '.9', left: '250px'}, function() {
                        setTimeout(function() {
                            $("#id_email").focus();
                        }, 100);
                    });
                }); 
            }
        });
    };
}).call(this);
