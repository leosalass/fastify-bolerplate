/**
 * *The log level
 * The log level is the threshold that the logger will use to decide if a message should be logged or not. The typical log levels are:
 *
 * 'fatal'
 * 'error'
 * 'warn'
 * 'info'
 * 'debug'
 * 'trace'
 *
 * *for more informatio please cehck:
 * https://github.com/pinojs/pino/blob/master/docs/web.md#fastify
 * https://backend.cafe/how-to-change-the-log-level-at-runtime-in-fastify
 */

const date = new Date();
const dateString = date.toISOString().split('T')[0].split('-').join('');
const LOG_FILE = `./logs/log-${dateString}.log`;
const LOG_LEVEL = process.env.LOG_LEVEL;

const logConfig = {
  development: {
    level: LOG_LEVEL,
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  developmentLogs: {
    level: LOG_LEVEL,
    stream: LOG_FILE
  },
  production: true,
  test: false,
}

export default {
  config: logConfig
}
