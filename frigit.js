var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
 
var ambient = ambientlib.use(tessel.port['A']);



ambient.on('ready', function () {
    
    // get light data
    setInterval(function () {
        ambient.getLightLevel(function(err, ldata) {
            detect_door(ldata);
        });

        ambient.getSoundLevel( function(err, sdata) {
            if (err) throw err;
            detect_compressor(sdata);
        });

    }, 500);

});


var compressor_on = false, start_compressor;
var avg_compressor = 0, n_compressor = 0;

function detect_compressor(sound) {
    console.log('sound', sound)

    if (avg_compressor > 0 && sound > (2 * avg_compressor)) {
        open_compressor = true;
        if (!start_compressor) {
            start_compressor = Date.now();
        }
    } else {
        console.log('avg_compressor', avg_compressor, 'n', n_compressor);
        avg_compressor = ((avg_compressor * n_compressor) + sound) / (n_compressor + 1);
        n_compressor++;

        open_compressor = false;
        if (start_compressor) { 
            var delta = (Date.now() - start_compressor) / 1e3;
            console.log("Compressor was on for ", delta, " seconds");
        }
        start_compressor = false;
    }
}


var open_door = false, start_door;
var avg_door = 0, n_door = 0;
function detect_door(light) {
    // console.log(light, avg_door);

    if (avg_door > 0 && light > (2 * avg_door)) {
        open_door = true;
        if (!start_door) {
            start_door = Date.now();
        }
    } else {
        // console.log('avg_door', avg_door, 'n', n_door);
        avg_door = ((avg_door * n_door) + light) / (n_door + 1);
        n_door++;

        open_door = false;
        if (start_door) { 
            var delta = (Date.now() - start_door) / 1e3;
            console.log("Door was open for ", delta, " seconds");
        }
        start_door = false;
    }
}