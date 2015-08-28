// console.log('panel created.');
window.onload = function () {
        // console.log('window completely loaded.');
    }
    // self.port.on('fxhs-ready', function (data) {});
self.port.on('update_info', updatePanel);

function updatePanel(data) {
    //
    var hello = data.hello;
    var payload = data.dataload;
    window.getElementById('hostname').innerHTML = payload;
}

