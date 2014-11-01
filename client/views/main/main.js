Template.home.helpers({});
Template.home.events({
    "click .logout": function(event) {
        event.preventDefault();
        // logout CurrentUser
        Meteor.logout();
    }
});
