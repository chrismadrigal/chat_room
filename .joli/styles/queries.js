var util = require('util');
require('colors');

module.exports = {
  filter: function (data) {
    return data.type.match(/query/i);
  },
  map: function (data) {
    if (!Array.isArray(data.values)) {
      data.values = [data.values];
    }
    var rows = [];
    if (data.error) {
      rows.push(data.type.red);
      rows.push('ERR:'.grey);
      rows.push(data.error);
      rows.push('');
    }
    else {
      rows.push(data.type.green);
    }
    return rows.concat([
      'SQL:'.grey,
      data.sql,
      'Values:'.grey,
      '[ ' + data.values.join(', ') + ' ]',
      ''
    ]).join('\n');
  }
};