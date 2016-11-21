var settings = require('./src/readSettings')(require('./config'));
var express = require('express');
var bodyParser = require('body-parser');
var sendEmail = require('./src/sendEmail.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var app = express();
app.use(bodyParser.json());
var router = express.Router();
app.use('/', router);
router.post('/' + settings.route, sendEmail);
app.listen(settings.port, function () {
  console.log('Working on port ' + settings.port);
});
