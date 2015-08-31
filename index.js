"use strict";
var self = require('sdk/self');
var {
    ToggleButton
} = require('sdk/ui/button/toggle');
// var button
var buttons = require('sdk/ui/button/action');
var panels = require('sdk/panel');
var tabs = require('sdk/tabs');
var info_lookup = require('./lib/info_lookup');
var button = buttons.ActionButton({
    id: 'hstools-b',
    label: 'ASinine: Network Info',
    icon: {
        '16': './icon-16.png',
        '32': './icon-32.png',
        '64': './icon-64.png'
    },
    onClick: button_click_handler
});
var panel = panels.Panel({
    width: 300,
    height: 300,
    onShow: panel_show_handler,
    onHide: panel_hide_handler,
    contentURL: './panel.html',
    contentScriptFile: './index_content_script.js'
});
tabs.on('activate', tabs_activate_handler);
tabs.on('ready', tabs_ready_handler);
tabs.on('load', tabs_load_handler);

function button_click_handler(state) {
    console.log('Clicked Button (panel is ' + (state.checked ? 'shown' : 'hidden') + ')');
    // if (state.checked) {
    panel.show({
        position: button
    });
    // info_lookup.get_network_info_from_url(tabs[0].url, panel);
    // } else {
    // panel.hide();
    // }
}

function panel_hide_handler() {
    // button.state('tab', {
    // checked: false
    // });
}

function panel_show_handler() {
    // info_lookup.get_network_info_from_url(tabs[0].url, panel);
}

function tabs_activate_handler(tab) {
    //
}

function tabs_ready_handler(tab) {
    var alertContentScript = "";
    var worker = tab.attach({
        contentScript: alertContentScript
    });
    // worker.port.emit("alert", "Message from the add-on");
    panel.port.on('respond_info', function (data) {
        console.log('Received emitted message: ', data);
        worker.port.emit('update_info', data);
        info_lookup.get_network_info_from_url(tab.url, panel);
    });
}

function tabs_load_handler(tab) {
    //
}
var loadUrlbarButton = function (doc, urlBtnClick) {
    var urlBarIcons = doc.getElementById('urlbar-icons')
    var btn = doc.createElement('toolbarbutton');
    btn.setAttribute('id', 'asinine-urlbar');
    btn.setAttribute('image', require('sdk/self').data.url('icon-16.png'));
    btn.setAttribute('label', 'ASinine: Network Info');
    btn.addEventListener('command', urlBtnClick, false);
    urlBarIcons.appendChild(btn);
    // urlbarButton.setAttribute('image', data.url('my-activated-icon.png'));
    // btn.setAttribute('image', './icon-16.png');
    return btn;
}
var doc = require('sdk/window/utils').getMostRecentBrowserWindow().document;
var onBtnClick = function (event) {
    //do something when URL bar button is clicked
    panel.show({
        position: urlbarButton
    });
    // console.log('Received emitted message: ', data);
    info_lookup.get_network_info_from_url(tab.url, worker);
    // worker.port.emit('update_info', data);
}
var urlbarButton = loadUrlbarButton(doc, onBtnClick);

