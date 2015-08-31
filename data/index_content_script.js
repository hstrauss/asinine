// window.onload = function () {}
// window.onpageshow = function () {}
// window.onpagehide = function () {}
self.port.on('update_info', updatePanel);

function updatePanel(data) {
    console.log('received message: ');
    console.log(data);
    window.getElementById('hostname').innerHTML = data.host;
    window.getElementById('addressesv4').innerHTML = data.addressesv4;
    window.getElementById('addressesv6').innerHTML = data.addressesv6;
    window.getElementById('asnumbersv4').innerHTML = data.asnsv4;
    window.getElementById('asnumbersv6').innerHTML = data.asnsv6;
}

