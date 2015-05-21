var tessel = require('tessel');
var infrared = require('ir-attx4').use(tessel.port['B']);
var climate = require('climate-si7020').use(tessel.port['C']);

var first = true, power = null;

function listen(data, other) {
    if (!first) return;
    first = false;
    power = data;
    // don't listen any more to prevent 
    infrared.removeListener('data', listen);
    readTemp();
}

infrared.on('ready', function(err) {
    infrared.on('data', listen);
    console.log('please register the power button');
});

var last_emit = false;
function emit() {
    
    if (!power) return;

    if (!last_emit) {
        last_emit = Date.now();
    } else {
        if ((Date.now() - last_emit) < 10e3) return;
        last_emit = Date.now();
    }

    console.log('emitting power signal');

    infrared.sendRawSignal(38, power, function(err) {
        console.log(err ? "failure" : "sent");
        setTimeout(function() {
            infrared.sendRawSignal(38, power, function(err) {
                console.log(err ? "failure" : "sent");
            });
        }, 1e2);
    });
}

var temps = new Array();
var thermostat = 74;
var padding = 0.5;

function average(temps) {
    var sum = 0;
    var len = temps.length - 1;
    for (var i = 0; i < len; i++) {
        sum += temps[i];
    }
    return sum / len;
}

function readTemp() {
    climate.readTemperature('f', function (err, fahrenheit) {
        var current = fahrenheit;
        
        // only keep the last 20 samples
        temps.push(current);
        if (temps.length > 20) { temps.shift(); }

            var avg = average(temps);
            console.log('current:', current.toFixed(3), 'average:', avg.toFixed(3));

            // pretty crude detection of fan state
            var fan_on = current < avg;
            console.log('fan is:', fan_on ? "on" : "off");

            if (current > (thermostat + padding)) {
                console.log('too hot');
                if (!fan_on) { 
                    console.log('fan should be on');
                    emit();
                }
            } else if (current < (thermostat - padding)) {
                console.log('too cold');
                if (fan_on) {
                    console.log('fan should be off');
                    emit();  
                } 
            } else {
                console.log('okay')
            }
        // }

        setTimeout(readTemp, 1e3);
    });
}

