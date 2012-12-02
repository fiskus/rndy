RndyPopup = function() {};


RndyPopup.prototype.options = {
    selectors: {
        container: '.popup',
        contentBox: '.popup-content',
        close: '.popup-close'
    },
    classNames: {
        showed: 'popuped',
        hided: 'unpopuped'
    }
};


RndyPopup.prototype.init = function() {
    this.container = $(this.options.selectors.container);
    this.contentBox = $(this.options.selectors.contentBox);
    this.closeControl = $(this.options.selectors.close);

    this.closeControl.on('click', $.proxy(this.hide, this));
};


RndyPopup.prototype.show = function() {
    this.container.show();
    $('html').removeClass(this.options.classNames.hided);
    $('html').addClass(this.options.classNames.showed);
};


RndyPopup.prototype.hide = function() {
    this.container.hide();
    $('html').removeClass(this.options.classNames.showed);
    $('html').addClass(this.options.classNames.hided);
};
