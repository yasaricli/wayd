Wayd = {
    Router: function() {
            
        // onBeforeAction
        Router.onBeforeAction(function () {
            if (!Meteor.userId()) {
                // if the user is not logged in, render the Login template
                this.layout('AuthLayout');
                this.render('auth');
            } else { 
                /*
                * otherwise don't hold up the rest of hooks or our route/action function
                * from running 
                */
                this.layout('WaydLayout');
                this.next(); 
            }
        });

        // Router configures
        Router.configure({ });

        Router.route('/', function() { this.render('home'); });
        Router.route('/wayds', function() { this.render('wayds'); });
        Router.route('/settings', function() { this.render('settings'); });
    },
    Helpers: {
        session: function(key) {
            return Session.get(key);
        },
        /*
        * relative format then {{ moment date=datetime format='relative' }} 
        * date format then {{ moment date=datetime format='YYYY d:M'}}
        */ 
        moment: function(arg) {
            var kwargs = arg.hash;
            if (kwargs.format == 'relative') return moment(kwargs.date).fromNow();
            return moment(kwargs.date).format(kwargs.format);         
        }
    }
};

// Router
Wayd.Router();

// Context Helpers
_.each(Wayd.Helpers, function(fn, name) { Template.registerHelper(name, fn); });
