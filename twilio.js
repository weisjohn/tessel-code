// process the argv
var opts = process.argv.slice(2);
if (opts.length !== 4) {
    console.log("account, token, from, and to, are all required");
    process.exit(1);
}

var twilio = require('twilio')(opts[0], opts[1]);

console.log('sending message');
twilio.sendMessage({
    from: opts[2],
    to: opts[3],
    body: "hello world from tessel"
}, function(err, resp) {
    if (err) return console.log("message failed to send", err);
    console.log('success');
});
