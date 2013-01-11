var util = require('util');
require('colors');

module.exports = {
  filter: function (data) {
    return data.type === 'request';
  },
  map: function (data) {
    var status;
    function statusRange (low) {
      if (data.status >= low && data.status < low + 100) {
        return true;
      }
      return false;
    }
    if (statusRange(200)) {
      status = data.status.toString().green;
    }
    else if (statusRange(300)) {
      status = data.status.toString().grey;
    }
    else if (statusRange(400)) {
      status = data.status.toString().orange;
    }
    else if (statusRange(500)) {
      status = data.status.toString().red;
    }
    else {
      status = data.status.toString().white;
    }
    return util.format('%s %s%s %s', data.req.method.grey, data.req.headers.host && data.req.headers.host.white, data.req.url.pathname, status);
  }
};