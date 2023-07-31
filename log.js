const EventEmitter = require('events');
const util = require('util');

class Logger {
  log(msg) {
    console.log(msg);

    this.emit('log_in_event', {id: 1, name: 'John Doe'});
  }
};

util.inherits(Logger, EventEmitter);

module.exports = Logger;
