/* TODO:
 *
 *    add url attribute for mobile
 *    add validation
 *    process datalist node removing
 */

PSW = function() {};

PSW.prototype.settings = {
    selectors: {
        form: 'form',
        ajax: '#ajax',
        output: '.output',
        password: '#password',
        domain: '#domain',
        domainList: '#domain-list',
        passwordReset: '.password-reset'
    }
};


PSW.prototype.init = function() {
    this.form = $(this.settings.selectors.form);
    this.form.on('submit', $.proxy(this._onSubmit, this));

    this.passwordInput = $(this.settings.selectors.password)
    this.domainInput = $(this.settings.selectors.domain)
    this.domainList = $(this.settings.selectors.domainList)

    if (this.isPaswordStored()) {
        this.hidePasswordInput();
    }

    if (this.isDomainStored()) {
        this.setDomainsList();
    }
};


PSW.prototype.pastePassword = function(text) {
    $(this.settings.selectors.output).html(text);
};


PSW.prototype._onSubmit = function(event) {
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


PSW.prototype.isAjax = function() {
    return $(this.settings.selectors.ajax).prop('checked');
};


PSW.prototype.serialize = function() {
    this.storePassword();
    this.storeDomain();
    this.data = this.form.serialize();
};


PSW.prototype.requestPassword = function() {
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


PSW.prototype._onSuccess = function(data) {
    this.pastePassword(data);
};


PSW.prototype._onError = function(data) {
    this.pastePassword('ERROR: ' + data);
};


PSW.prototype.storePassword = function(data) {
    sessionStorage.setItem('masterpassword', this.passwordInput.val());
};


PSW.prototype.isPaswordStored = function() {
    var password = sessionStorage.getItem('masterpassword');

    if (password) {
        this.password = password;
        return true;
    } else {
        return false;
    }
};


PSW.prototype.hidePasswordInput = function() {
    this.passwordInput.val(this.password);
    this.passwordInput.hide();
    this.passwordReset = $(this.settings.selectors.passwordReset);
    this.passwordReset.addClass('active');
    this.passwordReset.on('click', $.proxy(this.showPasswordInput, this));
};


PSW.prototype.showPasswordInput = function() {
    this.passwordInput
        .val('')
        .show()
        .focus();
    this.passwordReset.removeClass('active');
    this.passwordReset.off('click');
};


PSW.prototype.storeDomain = function() {
    var domainsString = localStorage.getItem('domains') || '',
        domains = domainsString.split(',');
    domains.push(this.domainInput.val());
    localStorage.setItem('domains', domains);
};


PSW.prototype.isDomainStored = function() {
    return localStorage.getItem('domains');
};


PSW.prototype.setDomainsList = function() {
    var domainsString = localStorage.getItem('domains') || '',
        domains = domainsString.split(',');
    for (i in domains) {
        this.domainList.append('<option value="' + domains[i] + '"></option>');
    }
};
