var http = require('http');

http.request({ host: 'johnweis.com' }, function(err, resp) {
    if (err) console.log(err);
    if (resp) console.log(resp);
});