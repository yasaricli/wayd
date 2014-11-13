Initialize(function() {
    var _this = this;

    // default sessions
    Session.setDefault("authform", "login");
    Session.setDefault("autherror", false);
    
    // Auth Object
    var Auth = {
        error: function(err) {
            Session.set("autherror", false);
            if (err) Session.set("autherror", err);
        },
        errCall: function(err) {
            if (err) Auth.error(err.reason);
        },
        check: function(field) {
            var $this = $(field);
            $this.removeClass("error");
            if (!$.trim(field.value)) { 
                $this.addClass("error");
                this.error("Please fill in the required fields.");
                return false;
            }
            return $this.val();
        }
    };
    
    Template.auth.helpers({
        template: function() {
            Auth.error();
            return Template[Session.get("authform")];
        }
    });
   
    Template.avatar.helpers({
        avatar: function() {
            return Avatars.findOne({}, { sort: { uploadedAt: -1 }});
        }
    });

    Template.login.events({
        "submit #LoginForm": function(event, t) {
            var email = Auth.check(t.find('#email')),
                password = Auth.check(t.find('#password'));
            if (email && password) {
                Meteor.loginWithPassword(email, password, function(err) {
                    if (err) Auth.errCall(err);
                    Router.go('/');
                });
            }
            event.preventDefault();
        },
        "focus input": function() {
            var height = $("body").height();
            $("html, body").animate({ scrollTop: height });
        },
        "click .signup": function() {
            event.preventDefault();
            Session.set("authform", "register");
        }
    });
    
    Template.register.events({
        "submit #RegisterForm": function(event, t) {
            var email = Auth.check(t.find('#email')),
                username = Auth.check(t.find('#username'));
                password = Auth.check(t.find('#password'));
            if (email && username && password) {
                Accounts.createUser({ 
                    username: username,
                    email: email,
                    password: password
                }, function() {
                    if (err) Auth.errCall(err);
                    Router.go('/settings');
                });
            }
            event.preventDefault();
        },
        "click .signin": function(event, t) {
            event.preventDefault();
            Session.set("authform", "login");
        }
    });
    
    Template.settings.events({
        'submit #SettingsForm': function(e, t) {
            e.preventDefault(); 
            Meteor.call('updateSessionUser', {
                'profile.firstname': t.find('#firstname').value,
                'profile.lastname': t.find('#lastname').value,
                'profile.bio': t.find('#bio').value
            }, function() {
                Router.go("/");
            });
        }
    });
    
    Template.avatar.events({
        'click .avatar:not(.notClick)': function(e, t) {
            _this.openPhotoLibrary(function(file) {
                Avatars.insert(file);
            });
        }
    });
});
