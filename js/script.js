function $(selector) {
    return document.querySelectorAll(selector);
}

function pastePassword(text) {
    var output = $('.output')[0];
    output.innerHTML = text;
}

function getPassword(event) {
    if (!$('#ajax')[0].checked) {
        return false;
    }

    event.preventDefault();

    var data = new FormData();
    var request = new XMLHttpRequest();

    var form = $('form')[0];
    var url = form.action;

    data.append('username', $('#username')[0].value);
    data.append('domain', $('#domain')[0].value);
    data.append('password', $('#password')[0].value);
    data.append('count', $('#count')[0].value);
    data.append('ajax', 'yes');

    request.open('POST', url, false);
    request.send(data);
     
    if (request.status === 200) {
      pastePassword(request.responseText);
    }
}

function init() {
    var form = $('form')[0];

    form.addEventListener('submit', getPassword, false);
}

init();
