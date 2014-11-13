Template.HamburgerMenu.events({
    'click .avatar': function(e, t) {
        e.preventDefault();
        e.stopPropagation();
    },
    'click .logout': function() {
        Meteor.logout();
    }
});
            
Template.HamburgerMenuButton.events({
    'click #HamburgerMenuButton': function(e, t) {
        var menu = $("#HamburgerMenu"),
            surface = $('#Surface'),
            hasOpened = menu.hasClass('opened');

        if (hasOpened) {
            menu.animate({ left: '-200px' }, 100);
            surface.animate({ left: '0px'}, 100);
            menu.removeClass('opened');
            return;
        }

        menu.animate({ left: '0px' }, 100);
        surface.animate({ left: '200px'}, 100);
        menu.addClass('opened');
    }
});

