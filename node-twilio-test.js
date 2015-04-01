var opts = process.argv.slice(2);
if (opts.length !== 4) {
    console.log("account, token, from, and to, are all required");
    process.exit(1);
}

var twilio = require('twilio')(opts[0], opts[1]);

twilio.sendMessage({
    from: opts[2],
    to: opts[3],
    body: "test message from node"
}, function(err, resp) {

    if (err) {
        sent = false;
        console.log('failure');
        return console.log("message failed to send", err);
    }
    console.log('success');
});