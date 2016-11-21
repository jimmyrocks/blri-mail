var fs = require('fs');
var path = require('path');

var readSettings = module.exports = function (settings) {
  var newSettings = {};
  for (var setting in settings) {
    var currentSetting = settings[setting];
    newSettings[setting] = JSON.parse(JSON.stringify(currentSetting));
    if (currentSetting.match) {
      var matched = currentSetting.match('^{{(.+?)}}$');
      if (matched && matched[1]) {
        var filePath = matched[1];
        newSettings[setting] = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8').replace('\n','');
      }
    }
  }
  return newSettings;
};

// console.log(readSettings(require('../config')));
