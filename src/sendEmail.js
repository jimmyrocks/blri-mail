var settings = require('./readSettings')(require('../config'));
var nodemailer = require('nodemailer');
console.log('x', settings);

module.exports = function (req, res) {
  var transporter = nodemailer.createTransport('smtp://' + settings.host);

  var message = (req.body.message && req.body.message.length) ? req.body.message : settings.defaults.message;
  var subject = (req.body.subject && req.body.subject.length) ? req.body.subject : settings.defaults.subject;

  var emailContent = {
    from: settings.mailfrom,
    to: settings.mailto,
    subject: subject,
    text: message
  };

  transporter.sendMail(emailContent, function (err, transporterResponse) {
    res.json({
      'error': err,
      'response': transporterResponse && transporterResponse.response,
      'content': emailContent
    });
  });

  // res.json(emailContent);
};
