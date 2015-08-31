// window.onload = function () {}
// window.onpageshow = function () {}
// window.onpagehide = function () {}
self.port.on('update_info', updatePanel);
self.port.on('respond_info', updatePanel);

function updatePanel(data) {
    console.log('received message: ');
    console.log(data);
    document.getElementById('hostname').textContent = data.host;
    document.getElementById('addressesv4').textContent = data.addressesv4;
    document.getElementById('addressesv6').textContent = data.addressesv6;
    document.getElementById('asnumbersv4').textContent = data.asnsv4;
    document.getElementById('asnumbersv6').textContent = data.asnsv6;
}

