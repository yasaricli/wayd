Wayd = {
    Router: function() {
            
        // onBeforeAction
        Router.onBeforeAction(function () {
            if (!Meteor.userId()) {
                // if the user is not logged in, render the Login template
                this.render('auth');
            } else { 
                /*
                * otherwise don't hold up the rest of hooks or our route/action function
                * from running 
                */
                this.next(); 
            }
        });

        // Router configures
        Router.configure({ layoutTemplate: 'layout' });

        // routers
        Router.route('/', function () {
            this.render('home');
        });
    },
    Helpers: {
        session: function(key) {
            return Session.get(key);         
        }
    }
};

// Router
Wayd.Router();

// Context Helpers
_.each(Wayd.Helpers, function(fn, name) { Template.registerHelper(name, fn); });
