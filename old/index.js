"use strict";
var self = require('sdk/self');
// var worker = Worker('./lib/info_lookup.js');
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
/*
function dummy(text, callback) {
    callback(text);
}
exports.dummy = dummy;
*/
var {
    ToggleButton
} = require('sdk/ui/button/toggle');
var buttons = require('sdk/ui/button/action');
var panels = require('sdk/panel');
var tabs = require('sdk/tabs');
var info_lookup = require('./lib/info_lookup');
var button = ToggleButton({
    id: 'hstools-b',
    label: 'Show Network Info',
    icon: {
        '16': './icon-16.png',
        '32': './icon-32.png',
        '64': './icon-64.png'
    },
    onClick: button_click_handler
});
var panel = panels.Panel({
    width: 300,
    height: 400,
    onHide: panel_show_handler,
    onHide: panel_hide_handler,
    contentURL: './panel.html',
    contentScriptFile: './index_content_script.js'
});
tabs.on('activate', tabs_activate_handler);
tabs.on('ready', tabs_ready_handler);
tabs.on('load', tabs_load_handler);

function button_click_handler(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    } else {
        panel.hide();
    }
}

function panel_hide_handler() {
    button.state('tab', {
        checked: false
    });
}

function panel_show_handler() {
    // button.state('tab', {
    // checked: false
    // });
    // console.log('panel_show_handler()');
}

function tabs_activate_handler(tab) {
    // console.log("tabs_activate_handler(): " + tab.url);
}

function tabs_ready_handler(tab) {
    // console.log("tabs_ready_handler(): " + tab.url);
    panel.port.on('respond_info', function (data) {
        console.log('Received emitted message: ' + data);
    });
    info_lookup.get_network_info_from_url(tab.url, panel);
}

function tabs_load_handler(tab) {
    // console.log("tabs_load_handler(): " + tab.url);
}

