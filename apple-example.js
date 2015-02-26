var tessel = require('tessel');
var port = tessel.port['A'];
var apple = require('tessel-apple-remote')(port);

function sub_all(prefix) {
    if (!prefix) prefix = "";
    ["menu", "center", "up", "down", "right", "left", "play"].forEach(function(b) {
        b = prefix + b;
        apple.on(b, function() {
            console.log(b, "pressed", "\n");
        });
        apple.on(b + ".long", function() {
            console.log(b + ".long", "pressed", "\n");
        });
    });
}

// subscribe to all of the id namespaced events
apple.on('id', function(id) {
    console.log('id discovered', id);
    sub_all(id + ".");
});

apple.on('data', function(data) {
    // you still have access to the low-level data stream
    // console.log(data.toString('hex'));
});

sub_all();