var HamburgerMenu =  {
    animate: function(menuPx, surfacePx, complete) {
        var menu = $("#HamburgerMenu"),
            surface = $('#Surface'),
            complete = complete || function() {};
        menu.animate({ left: menuPx }, { duration: 100, complete: complete });
        surface.animate({ left: surfacePx }, { duration: 100 });
        return menu;
    },
    show: function(complete) {
        var animate = this.animate('0px', '200px', complete);
        animate.addClass('opened');
    },
    hide: function(complete) {
        var animate = this.animate('-200px', '0px', complete);
        animate.removeClass('opened');
    },
    toggle: function() {
        var menu = $("#HamburgerMenu"),
            hasOpened = menu.hasClass('opened');
        if (hasOpened) { 
            this.hide();
            return;
        }
        this.show();
    }
};

Template.HamburgerMenu.events({
    'click .avatar': function(e, t) {
        HamburgerMenu.hide(function() {
            Router.go("/");
        });
    },
    'click .logout': function() {
        HamburgerMenu.hide(function() {
            Meteor.logout();
        });
    }
});

Template.HamburgerMenuButton.events({
    'click #HamburgerMenuButton': function(e, t) {
        HamburgerMenu.toggle();
    }
});
