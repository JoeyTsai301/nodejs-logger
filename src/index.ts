import config from "config";
import { createLogger as createWinstonLogger, format, transports } from "winston";
import split from "split"

import DebugTransport from "./debugTransport";

const appName = config.get("appName");

export const createLogger = moduleName => {
  const logger = createWinstonLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: appName, label: moduleName },    
  })
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new DebugTransport({}));    
  }

  logger.stream = split().on('data', function (message) {
    logger.info(message);
  });
  return logger;
}


