// console.log('panel created.');
window.onload = function () {
        // console.log('window completely loaded.');
    }
    // self.port.on('fxhs-ready', function (data) {});
self.port.on('update_info', updatePanel);

function updatePanel(data) {
    //
    // var hello = data.hello;
    // var payload = data;
    console.log('received message: ');
    console.log(data);
    window.getElementById('hostname').innerHTML = data.host;
    window.getElementById('addressesv4').innerHTML = data.addressesv4;
    window.getElementById('addressesv6').innerHTML = data.addressesv6;
    window.getElementById('asnumbersv4').innerHTML = data.asnsv4;
    window.getElementById('asnumbersv6').innerHTML = data.asnsv6;
}
window.onpageshow = function () {
    // console.log("Panel Script running.");
}
window.onpagehide = function () {
    // console.log("Panel Script hidden.");
}

