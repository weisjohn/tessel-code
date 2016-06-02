
// deps
var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['C']);
var http = require('http');

// config
var opts = {
  method: 'POST',
  host: 'johnweis.com',
  port: '80',
  path: '/climate',
  headers: {
    'Content-Type': 'application/json',
  }
};
var interval = 60e3;

function record(data) {

  // apply some context-based data
  data.tag = 'sauna';
  data.date = (new Date()).toString()

  var json = JSON.stringify(data);
  // console.log(json);

  // create the request and send it
  var request = http.request(opts, function(res, err) {
    if (res) res.on('data', function(data) {
      console.log('response', data.toString());
    });
  });
  request.end(json);
}

function measure() {
  climate.readTemperature('f', function (err, temp) {
    climate.readHumidity(function (err, humidity) {
      console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humidity.toFixed(4) + '%RH');

      record({ temp: temp, humidity: humidity });

      // read every minute
      setTimeout(measure, interval);
    });
  });
}

climate.on('ready', function () {
  console.log('Connected to si7005');
  measure();
});
