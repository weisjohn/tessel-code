var tessel = require('tessel');
var infrared = require('ir-attx4').use(tessel.port['B']);

infrared.on('ready', function(err) {
    console.log('ready');
});

var reentrant = true;

infrared.on('data', function(data, other) {
    if (!reentrant) return;
    console.log('read', data.toString('hex'));
    reentrant = false;
    setTimeout(function() {
        infrared.sendRawSignal(38, data, function(err) {
            console.log(err ? "failure" : "sent");
            infrared.sendRawSignal(38, data, function(err) {
                console.log(err ? "failure" : "sent");
                setTimeout(function() { reentrant = true; }, 1e3);
            });
        });
    }, 3e3);
});