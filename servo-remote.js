var tessel = require('tessel');
var servolib = require('servo-pca9685');
var tar = require('tessel-apple-remote');
var async = require('async');

// initilize modules 
var apple = tar(tessel.port['A']);
var servo = servolib.use(tessel.port['D']);

// config
var servo1 = 1; // We have a servo plugged in at position 1

// wait for both of the modules to declare they are ready
async.parallel([
    function(cb) { servo.on('ready', cb) },
    function(cb) { apple.on('ready', cb) },
], function() {
    console.log('ready');
});
