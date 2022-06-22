const app = require('./app');
const config = require('config');
var port = normalizePort(process.env.PORT || config.get('port'));
app.listen(port);
console.log('server start at port: ' + port);
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}

module.exports = app;