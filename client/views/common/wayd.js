(function() {
    Planet('index') ({
        rendered: index_rendered,
        helpers: {
            err: function() {
                return Session.get('err');
            },
            email: function() {
                return Session.get('email');
            } 
        },
        events: {
            'click .subscribe-post': function() {
                $("#SubscribeForm").submit();
            },
            'submit #SubscribeForm': function(e, t) {
                e.preventDefault();
                subscribeForm(function(val) {
                    Session.set('email', val);
                });
            }         
        }
    });
}).call(this);
