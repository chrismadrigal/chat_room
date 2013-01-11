var tz = require('timezone');
require('colors');

module.exports = {
  filter: function (data) {
    return ['request', 'model query'].indexOf(data.type) < 0;
  },
  map: function (data) {
    var date = new Date(data.timestamp);
    var dateStr = tz(date, '%D %T').grey;
    if (data.type === 'msg') {
      return dateStr + '  ' + data.msg;
    }
    else {
      return dateStr + '  ' + data.type;
    }
  }
};