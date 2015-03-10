var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
 
var ambient = ambientlib.use(tessel.port['A']);
 
ambient.on('ready', function () {
    // get light data
    setInterval(function () {
        ambient.getLightLevel(function(err, ldata) {
            console.log(ldata.toFixed(8));
        });
    }, 500);
});