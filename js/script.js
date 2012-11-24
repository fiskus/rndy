//TODO:
//  + add url attribute for mobile
//  + add validation

PSW = function() {};

PSW.prototype.settings = {
    selectors: {
        form: 'form',
        ajax: '#ajax',
        output: '.output'
    }
}

PSW.prototype.pastePassword = function(text) {
    $(this.settings.selectors.output).html(text);
}

PSW.prototype._onSubmit = function(event) {
    if (this.isAjax()) {
        event.preventDefault();
        this.serialize();
        this.requestPassword();
    } else {
        return;
    }
}

PSW.prototype.isAjax = function() {
    return $(this.settings.selectors.ajax).prop('checked');
}

PSW.prototype.serialize = function() {
    this.data = this.form.serialize();
}

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
}

PSW.prototype._onSuccess = function(data) {
    this.pastePassword(data);
}

PSW.prototype._onError = function(data) {
    this.pastePassword('ERROR: ' + data);
}

//PSW.prototype.isPaswordStored = function() {
//}

PSW.prototype.init = function() {
    this.form = $(this.settings.selectors.form);
    this.form.on('submit', $.proxy(this._onSubmit, this));

    //this.isPaswordStored();
}
