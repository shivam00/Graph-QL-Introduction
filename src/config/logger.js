import winston from 'winston';
import { NODE_ENV } from './env';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
