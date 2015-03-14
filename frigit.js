var tessel = require('tessel');
var async = require('async');

// climate
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);

// ambient
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['B']);


// system config
var config = { read_interval: 500 }

// system state
var state = {
    door: false,
    comp: false,
    light: null,
    sound: null,
    humid: null,
    temp: null,
    avg: { light: 0, sound: 0 },
    n: { light: 0, sound: 0 },
    start: {}
};


// startup
async.parallel([
    function(cb) { climate.on('ready', cb); },
    function(cb) { ambient.on('ready', cb); },
], function() {
    console.log('modules are ready');
    climateloop();
    ambientloop();
    setTimeout(statelogger, 1e3);
});

// connection to hardware loop for climate
function climateloop() {
    climate.readTemperature('f', function(err, temp) {
        climate.readHumidity(function(err, humid) {
            state.temp = temp;
            state.humid = humid;
            setTimeout(climateloop, config.read_interval);
        });
    });
}

// connection to hardware loop for ambient
function ambientloop() {
    ambient.getLightLevel(function(err, light) {
        ambient.getSoundLevel(function(err, sound) {
            state.light = light;
            state.sound = sound;
            detect('door', 'light');
            detect('comp', 'sound');
            setTimeout(ambientloop, config.read_interval);
        });
    });
}

function statelogger() {
    var log = ["light", "sound", "humid", "temp"].reduce(function(p, c) {  
        var val = state[c];
        if (val) val = val.toFixed(4);
        return p + c + ":" + val + " ";
    }, "");
    console.log(log);
    setTimeout(statelogger, config.read_interval);
}


function detect(item, type) {

    if (state.avg[type] > 0 && state[type] > (2 * state.avg[type])) {
        state[item] = true;
        if (!state.start[item]) {
            state.start[item] = Date.now();
        }
    } else {
        state.avg[type] = ((state.avg[type] * state.n[type]) + state[type]) / (state.n[type] + 1);
        state.n[type]++;
        state[item] = false;
        if (state.start[item]) { 
            var delta = (Date.now() - state.start[item]) / 1e3;
            console.log(item, "was ", item == "door" ? "open" : "on", " for ", delta, " seconds");
        }
        state.start[item] = false;
    }

}

