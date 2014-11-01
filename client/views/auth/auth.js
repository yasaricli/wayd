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
        if (err) this.error(err.reason);
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

Template.login.events({
    "submit #LoginForm": function(event, t) {
        var email = Auth.check(t.find('#email')),
            password = Auth.check(t.find('#password'));
        if (email && password) {
            Meteor.loginWithPassword(email, password, Auth.errCall);
        }
        event.preventDefault();
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
            }, Auth.errCall);
        }
        event.preventDefault();
    },
    "click .signin": function(event, t) {
        event.preventDefault();
        Session.set("authform", "login");
    }
});
