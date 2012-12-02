RndyDomainSettings = function() {};

extend(RndyDomainSettings, RndyPopup);

RndyDomainSettings.prototype.options = $.extend(
    true,
    {},
    RndyDomainSettings._super.options,
    {
        selectors: {
            settingsClose: '.settings_control'
        }
    }
);

RndyDomainSettings.prototype.init = function() {
    RndyDomainSettings._super.init.call(this);

    var domainsList = this.getDomainsList().html;
    if (domainsList) {
        this.contentBox.html(domainsList);
        this.contentBox.find('.domain')
            .on('click', $.proxy(this.removeDomain, this));
    } else {
        this.contentBox.html('<h2>Local storage empty</h2>');
    }
};


RndyDomainSettings.prototype.getDomainsList = function() {
    var domainsString = localStorage.getItem('domains');
    if (domainsString === '') {
        return false;
    }
    var domains = domainsString.split(','),
        html = '<h2>Click domain to remove</h2><ul>';
    console.log(domainsString);

    for (var i in domains) {
        html += '<li><span class="domain">' + domains[i] + '</span></li>';
    }
    html += '</ul>';

    return {
        domains: domains,
        html: html
    }
};


RndyDomainSettings.prototype.removeDomain = function(event) {
    var listItem = $(event.currentTarget),
        domains = this.getDomainsList().domains,
        domain = listItem.text(),
        newDomains = [];

    for (var i in domains) {
        if (domain != domains[i]) {
            newDomains.push(domains[i])
        }
    }

    if (confirm('Realy remove "' + domain + '"?')) {
        localStorage.setItem('domains', newDomains);
        listItem.remove();
    }
};
