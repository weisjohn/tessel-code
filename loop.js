// a simple script to measure how fast the reporting loop will return

// most deltas are 5-7 milliseconds, however, every once in a while 
// there is a series of 20-30 frames with a delta > 15

// this is probably a GC pause, or a communications buffer clear

var frame = 0, now, delta;

setInterval(function() {
    now = Date.now();
    delta = now - frame;
    frame = now;
    console.log("delta is", delta);
}, 0)