var tessel = require('tessel');
var servolib = require('servo-pca9685');
var tar = require('tessel-apple-remote');
var async = require('async');

// initilize modules 
var apple = tar(tessel.port['A']);
var servo = servolib.use(tessel.port['D']);

// config - our servo is plugged into port 1
var port = 1;

// state - set the servo to the middle
var position = 0.5;

// first come, first serve
var first, second;

// helper function for the game
function move(vector, id) {
    position += vector * 0.1;

    if (0 >= position || position >= 1) {
        if (0 >= position) { 
            console.log(first, "wins");
        } else {
            console.log(second, "wins");
        }
        throw new Error("game over");
    }
    console.log(id, position);

    servo.move(port, position);
}

// wait for both of the modules to declare they are ready
async.parallel([
    function(cb) { servo.on('ready', cb) },
    function(cb) { apple.on('ready', cb) },
], function() {
    
    // min,max duty cycle for the servo
    servo.configure(port, 0.05, 0.12, function () {
        // initialize to middle position
        servo.move(port, position);    
    });

    apple.on('id', function(id) {

        // if there are two players, bolt
        if (second) return;

        // announce entrance in the game
        console.log('P', !first ? "1" : "2", 'appears: ', id);

        // set the vector for this player
        var vector = first ? 1 : -1;
        if (!first) {
            first = id;
        } else {
            second = id;
        }

        apple.on(id + ".up", function() {
            move(vector, id);
        });
    });

});
