const Logger = require('./log');
const logger = new Logger();

logger.on('log_in_event', (args) => {
  const {id, name} = args;

  console.log({id, name});
});

logger.log('User logged!');
