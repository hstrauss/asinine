"use strict";
exports.get_network_info_from_url = get_network_info_from_url;
var _self = require('sdk/self');

function sanitize(_input) {
    return _input;
}

function url_to_host(_input) {
    // var begin = _input.substr('://');
    var urlBegin = _input.indexOf('://') + 3;
    var host = _input.substr(urlBegin, _input.indexOf('/', urlBegin, -1) - urlBegin);
    if (host.indexOf(':') >= 0) {
        var host = host.substr(0, host.indexOf(':'));
    }
    return host;
}

function get_network_info_from_url(url) {
    var host = sanitize(url_to_host(url));
    if ((host == 'webscale.co.za') || (host == '') || (url.substr(0, 6) == 'about:')) {
        console.log('Not looking up ' + url + ' (host: ' + host + ')');
        return;
    }
    // console.log('Getting info for ' + host);
    // load('//webscale.co.za/get_network_info?q=' + sanitize(url), function () {
    // self.port.emit('respond_info', 'poop')
    // });
    // var self = require('sdk/self');
    var Request = require("sdk/request").Request;
    // var info_request = 
    Request({
        url: "http://webscale.co.za:3000/api/get_network_info?q=" + host,
        anonymous: true,
        // overrideMimeType: "text/plain; charset=latin1",
        onComplete: function (response) {
            var self = require('sdk/panel').Panel({
                contentURL: 'about:blank'
            });
            self.postMessage('respond_info', 'poop');
            console.log('Happy Poop for \'' + response.url.substr(50) + '\': ' + response.text);
            // console.log(response);
            // panel.port.emit('respond_info', 'poop');
        },
        onError: function (response) {
            var self = require('sdk/panel').Panel({
                contentURL: 'about:blank'
            });
            self.postMessage('respond_info', 'poop');
            console.log('Sad Poop! :(');
            // panel.port.emit('respond_info', 'poop');
        }
    }).get();
    // info_request.get();
}
// Our simplified "load" function accepts a URL and CALLBACK parameter.
// load('test.txt', function(xhr) {
// document.getElementById('container').innerHTML = xhr.responseText;
// });
/*function load(url, callback) {
    var xhr;
    if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
    else {
        var versions = ["MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ]
        for (var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {}
        } // end for
    }
    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if (xhr.readyState < 4) {
            return;
        }
        if (xhr.status !== 200) {
            return;
        }
        // all is well  
        if (xhr.readyState === 4) {
            callback(xhr);
        }
    }
    xhr.open('GET', url, true);
    xhr.send('');
}*/
// or with jQuery...
// $('#container').load('test.txt');

