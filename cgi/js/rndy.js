/* TODO:
 *
 *    add validation
 */

Rndy = function() {};

Rndy.prototype.options = {
    selectors: {
        form: 'form',
        ajax: '#ajax',
        output: '.output',
        password: '#password',
        domain: '#domain',
        domainList: '#domain-list',
        passwordReset: '.password-reset',
        settingsControl: '.settings_control',
        popup: '.popup'
    }
};

Rndy.prototype.init = function() {
    var els = this.options.selectors;

    this.form = $(els.form);
    this.form.on('submit', $.proxy(this._onSubmit, this));

    this.passwordInput = $(els.password);
    this.domainInput = $(els.domain);
    this.domainList = $(els.domainList);
    this.settingsControl = $(els.settingsControl);

    if (this.isPaswordStored()) {
        this.hidePasswordInput();
    }

    if (this.isDomainStored()) {
        this.setDomainsList();
    }

    if (this.isMobile()) {
        this.initMobile();
    }

    this.initSettings();
};

Rndy.prototype.initMobile = function() {
    //
};

Rndy.prototype.initSettings = function() {
    this.settingsControl.on('click', $.proxy(this.showDomainSettings, this));
};

Rndy.prototype.pastePassword = function(text) {
    $(this.options.selectors.output).html(text);
};

Rndy.prototype._onSubmit = function(event) {
    if (this.isAjax()) {
        event.preventDefault();
        this.serialize();
        this.requestPassword();
        if (this.isPaswordStored()) {
            this.hidePasswordInput();
        }
    } else {
        return;
    }
};

Rndy.prototype.isAjax = function() {
    return $(this.options.selectors.ajax).prop('checked');
};

Rndy.prototype.serialize = function() {
    this.storePassword();
    this.storeDomain();
    this.data = this.form.serialize();
};

Rndy.prototype.requestPassword = function() {
    var url = this.form.attr('action');

    $.ajax({
        type: 'POST',
        url: url,
        data: this.data,
        context: this,
        success: this._onSuccess,
        error: this._onError,
        dataType: 'text'
    });
};

Rndy.prototype._onSuccess = function(response, status, jqXHR) {
    this.pastePassword(jqXHR.responseText);
};

Rndy.prototype._onError = function(data) {
    this.pastePassword('ERROR: ' + data);
};

Rndy.prototype.storePassword = function(data) {
    sessionStorage.setItem('masterpassword', this.passwordInput.val());
};

Rndy.prototype.isPaswordStored = function() {
    var password = sessionStorage.getItem('masterpassword');

    if (password) {
        this.password = password;
        return true;
    } else {
        return false;
    }
};

Rndy.prototype.hidePasswordInput = function() {
    this.passwordInput.val(this.password);
    this.passwordInput.hide();
    this.passwordReset = $(this.options.selectors.passwordReset);
    this.passwordReset.addClass('active');
    this.passwordReset.on('click', $.proxy(this.showPasswordInput, this));
};


Rndy.prototype.showPasswordInput = function() {
    this.passwordInput
        .val('')
        .show()
        .focus();
    this.passwordReset.removeClass('active');
    this.passwordReset.off('click');
};


Rndy.prototype.storeDomain = function() {
    var domainsString = localStorage.getItem('domains'),
        domains = [],
        domain = this.domainInput.val();

    if (domainsString) {
        domains = domainsString.split(',');
    }

    if ($.inArray(domain, domains) > -1 || !/[a-z]/.test(domain)) {
        return false;
    }
    domains.push(domain);
    localStorage.setItem('domains', domains);
};


Rndy.prototype.isDomainStored = function() {
    return localStorage.getItem('domains');
};


Rndy.prototype.setDomainsList = function() {
    var domainsString = localStorage.getItem('domains') || '',
        domains = domainsString.split(',');
    for (var i in domains) {
        this.domainList.append('<option value="' + domains[i] + '"></option>');
    }
};


Rndy.prototype.isMobile = function() {
    return window.navigator.userAgent.indexOf('Mobile') > -1;
};


Rndy.prototype.showDomainSettings = function() {
    this.domainSettings = new RndyDomainSettings();
    this.domainSettings.init();
    this.domainSettings.show();
};
