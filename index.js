var self = require('sdk/self');
// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
    callback(text);
}
exports.dummy = dummy;
var buttons = require('sdk/ui/button/action');
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var button = buttons.ActionButton({
    id: "hstools-b",
    label: "Show Network Info",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: button_click_handler
});
var panel = panels.Panel({
    width: 200,
    height: 200,
    onHide: panel_hide_handler,
    contentURL: "./panel.html"
});

function button_click_handler(state) {
    if (state.checked) {
        panel.show();
    } else {
        panel.hide();
    }
}
// panel.show();
function panel_hide_handler() {
    button.state("window", {
        checked: false
    });
}
