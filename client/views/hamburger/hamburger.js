var HamburgerMenu =  {
    animate: function(menuPx, surfacePx, complete) {
        var menu = $("#HamburgerMenu"),
            surface = $('#MobileSurface'),
            complete = complete || function() {};
        menu.animate({ left: menuPx }, { duration: 100, complete: complete });
        surface.animate({ left: surfacePx }, { duration: 100 });
        return menu;
    },
    show: function(complete) {
        var body = $('body'),
            animate = this.animate('0px', '200px', complete),
            overlay = $('#HamburgerMenuOverlay');
        body.css({'overflow': 'hidden'});
        animate.addClass('opened');
        overlay.show();
    },
    hide: function(complete) {
        var body = $('body'),
            animate = this.animate('-200px', '0px', complete),
            overlay = $('#HamburgerMenuOverlay');
        body.css({'overflow': 'auto'});
        animate.removeClass('opened');
        overlay.hide();
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
    'click #HamburgerMenuOverlay': function() {
        HamburgerMenu.toggle();
    },
    'click .avatar': function(e, t) {
        HamburgerMenu.hide(function() {
            Router.go("/");
        });
    },
    'click .logout': function(e) {
        e.preventDefault();
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
