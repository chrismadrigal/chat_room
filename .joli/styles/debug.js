var tz = require('timezone');
var util = require('util');
require('colors');

module.exports = {
  filter: function (data) {
    return !data.type.match(/^(request|model query)$/);
  },
  map: function (data) {
    var src = '';
    if (data.src) {
      src = ('[' + data.src.file + ':' + data.src.line + ']').grey;
    }
    if (data.type === 'msg') {
      return data.msg + ' ' + src;
    }
    else if (data.type === 'dump') {
      var level = data.level;
      delete data.type;
      delete data.level;
      delete data.timestamp;
      delete data.src;
      return level + ' dump ' + src + "\n" + util.inspect(data, null, 8, true);
    }
    else {
      return data.type + ' ' + src;
    }
  }
};