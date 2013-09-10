// ==UserScript==
// @id             1
// @name           Rndy
// @version        0.1
// @namespace      rndy
// @author         Maxim Chervonny
// @description    
// @run-at         document-end
// ==/UserScript==

Rndy = function() {};

Rndy.prototype.url = 'http://pass.fiskus.name';
Rndy.prototype.styles = {
    close: _.template('position: absolute; right: 5px; top: 5px; font-size: 20px; cursor: pointer;'),
    iframe: _.template('border: 0;'),
    wrapper: _.template('position: absolute; left: <%= x %>px; top: <%= y %>px; box-shadow: 0 0 3px rgba(0,0,0,0.7); z-index: 1000;')
};

Rndy.prototype.init = function() {
    var inputs = document.querySelectorAll('input[type="password"]');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', _.bind(this.onClick, this, inputs[i]));
    }
};

Rndy.prototype.onClick = function(input, event) {
    if (this.isShowed) {
        return;
    }
    this.coordinates = {
        x: input.offsetLeft,
        y: input.offsetTop
    };
    var username = this.noseOutUsername(input);
    this.showPopup(username);
};

Rndy.prototype.showPopup = function(username) {
    this.isShowed = true;

    var iframe = this.createIframe(username);
    this.closeElement = this.createCloseElement();
    this.wrapper = this.createWrapper();

    this.wrapper.appendChild(this.closeElement);
    this.wrapper.appendChild(iframe);
    document.getElementsByTagName('body')[0].appendChild(this.wrapper);

    this.onRender();
};

Rndy.prototype.onRender = function() {
    this.closeElement.addEventListener('click', _.bind(this.close, this));
};

Rndy.prototype.close = function() {
    this.isShowed = false;
    document.getElementsByTagName('body')[0].removeChild(this.wrapper);
};

Rndy.prototype.createIframe = function(username) {
    var url = this.url;
    if (username) {
        url += '/' + username;
    }
    var attributes = {
        src: url,
        width: 420,
        height: 420,
        style: this.styles.iframe()
    };
    return this.createElement('iframe', attributes);
};

Rndy.prototype.createCloseElement = function() {
    var attributes = {
        style: this.styles.close()
    };
    return this.createElement('div', attributes, '×');
};

Rndy.prototype.createWrapper = function() {
    var attributes = {
        style: this.styles.wrapper(this.coordinates)
    };
    return this.createElement('div', attributes);
};

Rndy.prototype.createElement = function(tagName, attributes, innerHTML) {
    var element = document.createElement(tagName);
    _.each(attributes, function(value, key) {
        element.setAttribute(key, value);
    });
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    return element;
};

Rndy.prototype.noseOutUsername = function(input) {
    var loginElement = input.parentNode.querySelector('input[type="text"]');
    if (!loginElement) {
        loginElement = input.parentNode.parentNode.querySelector('input[type="text"]');
        if (!loginElement) {
            loginElement = input.parentNode.parentNode.parentNode.querySelector('input[type="text"]');
        }
    }
    return loginElement.value;
};
