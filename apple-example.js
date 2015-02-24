var tessel = require('tessel');
var port = tessel.port['A'];
var apple = require('tessel-apple-ir-remote')(port);


["menu", "center", "up", "down", "right", "left", "play"].forEach(function(b) {
    apple.on(b, function() {
        console.log(b, "pressed")
    })
    apple.on(b + ".long", function() {
        console.log(b + ".long", "pressed")
    })
});

apple.on('data', function(data) {
    // you still have access to the low-level data stream
    // console.log(data.toString('hex'));
});