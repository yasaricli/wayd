// Default sessions
Session.setDefault('pagelet', false);
Session.setDefault('pageletClick', true);

var Pagelet = {
    show: function(callback) {
        Session.set('pagelet', true);
        Session.set('pageletClick', false);
        callback && Meteor.setTimeout(callback, 200);
    },
    hide: function() {
        Session.set('pagelet', false);
        Session.set('pageletClick', true);
   }
};

Template.wayds.events({});

Template.pagelet.events({
    'click .pageletClick': function(e, t) {
        Pagelet.show(function() {
            t.find("#title").focus();
        });
    },
    'click .lightbox': function(e) {
        Pagelet.hide();
    },
    'click .share': function(e, t) {
        var text = t.find("#title").value;
        if ($.trim(text)) {
            Pagelet.hide();
            Meteor.call('newWayd', { 
                text: text 
            });
        }
    }
});

Template.wayds.helpers({});
Template.pagelet.helpers({});
