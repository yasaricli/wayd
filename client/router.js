(function() {
    var preloadSubscriptions, Filters;
        
    // preload Meteor.subscribe list
    preloadSubscriptions = [''],

    // Filters
    Filters = {};     
     
    // CONFIGURE
    Router.configure({
        layoutTemplate: 'layout',
        notFoundTemplate: 'notFound',
        loadingTemplate: 'loading',
        waitOn: function () {
            return _.map(preloadSubscriptions, function(sub) {
                Meteor.subscribe(sub);
            });
        }
    });

    // Before Hooks
    // 

    // after Hooks
    //

    // Mapper
    Router.map(function () {
        this.route('index', { path: '/' });
    });
}).call(this);
