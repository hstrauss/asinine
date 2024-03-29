"use strict";
var self = require('sdk/self');
var {
    ToggleButton
} = require('sdk/ui/button/toggle');
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
    panel.show({
        position: button
    });
    info_lookup.get_network_info_from_url(tabs.activeTab.url, panel);
    console.log(tabs);
    console.log(tabs.activeTab);
}

function panel_hide_handler() {
    //
}

function panel_show_handler() {
    //
}

function tabs_activate_handler(tab) {
    //
}

function tabs_ready_handler(tab) {
    /*
    var alertContentScript = "";
    var worker = tab.attach({
        contentScript: alertContentScript
    });
    panel.port.on('respond_info', function (data) {
        console.log('Received emitted message: ', data);
        worker.port.emit('update_info', data);
        info_lookup.get_network_info_from_url(tab.url, panel);
    });
    */
}

function tabs_load_handler(tab) {
    var alertContentScript = "";
    var worker = tab.attach({
        contentScript: alertContentScript
    });
    worker.port.on('respond_info', function (data) {
        console.log('Received emitted message: ', data);
        worker.port.emit('update_info', data);
        info_lookup.get_network_info_from_url(tab.url, worker);
    });
}
var loadUrlbarButton = function (doc, urlBtnClick) {
    var urlBarIcons = doc.getElementById('urlbar-icons')
    var btn = doc.createElement('toolbarbutton');
    btn.setAttribute('id', 'asinine-urlbar');
    btn.setAttribute('image', require('sdk/self').data.url('icon-16.png'));
    btn.setAttribute('label', 'ASinine: Network Info');
    btn.addEventListener('command', urlBtnClick, false);
    urlBarIcons.appendChild(btn);
    return btn;
}
var doc = require('sdk/window/utils').getMostRecentBrowserWindow().document;
var onBtnClick = function (event) {
    panel.show({
        position: urlbarButton
    });
    info_lookup.get_network_info_from_url(tab.url, worker);
}
var urlbarButton = loadUrlbarButton(doc, onBtnClick);

