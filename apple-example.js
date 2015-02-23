var tessel = require('tessel');
var port = tessel.port['A'];
var apple = require('tessel-apple-ir-remote')(port);

apple.on('menu.press', function() {
    console.log('menu.press');
});

apple.on('data', function(data) {
    // you still have access to the low-level data stream
});