// process the argv
var opts = process.argv.slice(2);
if (opts.length !== 4) {
    console.log("account, token, from, and to, are all required");
    process.exit(1);
}

var twilio = require('twilio')(opts[0], opts[1]);

// console.log('sending message');
// twilio.sendMessage({
//     from: opts[2],
//     to: opts[3],
//     body: "hello world from tessel"
// }, function(err, resp) {
//     if (err) return console.log("message failed to send", err);
//     console.log('success');
// });

// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic climate example logs a stream
of temperature and humidity to the console.
*********************************************/

var tessel = require('tessel');
// if you're using a si7020 replace this lib with climate-si7020
var climatelib = require('climate-si7020');

var climate = climatelib.use(tessel.port['A']);

var sent = false;
var limit = 55;

climate.on('ready', function () {
  console.log('Connected to si7020');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');

        if (!sent && humid > limit) {
            sent = true;
            
            twilio.sendMessage({
                from: opts[2],
                to: opts[3],
                body: "Warning, humidity is too high: " + humid.toFixed(3) + "%"
            }, function(err, resp) {

                if (err) {
                    sent = false;
                    console.log('failure');
                    return console.log("message failed to send", err);
                }
                console.log('success');
            });
        }

        setTimeout(loop, 300);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});