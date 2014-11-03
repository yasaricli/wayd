var Wayd = {
    Router: function() {
        var preloadSubscriptions = ['session'];
        // Router configures
        Router.configure({ 
            loadingTemplate: 'loading',
            waitOn: function () {
                return _.map(preloadSubscriptions, function(sub) {
                    Meteor.subscribe(sub);
                });
            }
        });

        // onBeforeAction
        Router.onBeforeAction(function() {
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

        Router.map(function() {
            this.route('home', { path: '/' });

            // wayds page
            this.route('wayds', { 
                path: 'wayds' ,
                waitOn: function() {
                    return Meteor.subscribe('wayds');
                }
            });

            // settings page
            this.route('settings', { path: 'settings' }) ;
        });
    },
    Helpers: {
        // if console {{ console args or a=a }}
        console: function() {
            console.log(arguments);         
        },
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
        },
        avatar: function(userId) {
            var avatar = Avatars.findOne({ userId: userId }, { sort: { uploadedAt: -1 }});
            return avatar ? avatar.url() : '/defaults/default-avatar.png';    
        }
    }
};

// Router
Wayd.Router();

// Context Helpers
_.each(Wayd.Helpers, function(fn, name) { Template.registerHelper(name, fn); });
