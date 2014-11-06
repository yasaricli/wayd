Initialize(function() {
    var _this = this,
        preloadSubscriptions = ['session'];

    /*
    * enable CFS debug logging 
    * default GET request headers 
    */
    FS.debug = true;
    FS.HTTP.setHeadersForGet([
        ['Cache-Control', 'public, max-age=31536000']
    ]);  

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

    // this place your route declarations in a Router.map block
    Router.map(function() {
        this.route('home', { path: '/' });
        this.route('settings', { path: 'settings' }) ;

        // subscribe views
        this.route('wayds', { 
            path: 'wayds' ,
            waitOn: function() {
                return Meteor.subscribe('wayds');
            }
        });
    });

    _this.Helpers({
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
    });
});
