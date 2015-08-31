"use strict";
// var _self = require('sdk/self');
/* --- HELPERS --- */
function sanitize(_input) {
    return _input;
}

function url_to_host(_input) {
    var urlBegin = _input.indexOf('://') + 3;
    var host = _input.substr(urlBegin, _input.indexOf('/', urlBegin, -1) - urlBegin);
    if (host.indexOf(':') >= 0) {
        var host = host.substr(0, host.indexOf(':'));
    }
    return host;
}
/* --- FUNCTIONS --- */
function get_network_info_from_url(url, _panel) {
    var host = sanitize(url_to_host(url));
    if ((host == 'webscale.co.za') || (host == '') || (url.substr(0, 6) == 'about:')) {
        return;
    }
    var Request = require("sdk/request").Request;
    // console.log('url: http://webscale.co.za/api/gni/' + host);
    Request({
        url: "http://webscale.co.za/api/gni/" + host,
        overrideMimeType: "application/json; charset=utf-8",
        onComplete: function (response) {
            // console.log(response.json);
            // _self.port.emit('respond_info', response.json);
            _panel.port.emit('respond_info', response.json);
            console.log('Happy Poop for \'' + response.url.substr(30) + '\': ' + response.text);
        },
        onError: function (response) {
            var self = require('sdk/panel').Panel({
                contentURL: 'about:blank'
            });
            console.log('Sad Poop! :( [' + response.status + ']');
            console.log(response.responseText);
        }
    }).get();
}
/* --- EXPORTS --- */
exports.get_network_info_from_url = get_network_info_from_url;

