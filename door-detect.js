var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
 
var ambient = ambientlib.use(tessel.port['A']);

var avg = 0, n = 0;

ambient.on('ready', function () {
    
    // get light data
    setInterval(function () {
        ambient.getLightLevel(function(err, ldata) {
            detect(ldata);
        });
    }, 500);
});

var open = false, start;

function detect(light) {
    // console.log(light, avg);

    if (avg > 0 && light > (2 * avg)) {
        open = true;
        if (!start) {
            start = Date.now();
        }
    } else {
        console.log('avg', avg, 'n', n);
        avg = ((avg * n) + light) / (n + 1);
        n++;

        open = false;
        if (start) { 
            var delta = (Date.now() - start) / 1e3;
            console.log("Door was open for ", delta, " seconds");
        }
        start = false;
    }
}