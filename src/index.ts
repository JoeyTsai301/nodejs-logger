import config from "config";
import { createLogger as createWinstonLogger, format, transports } from "winston";
import split from "split"

import DebugTransport from "./debugTransport";

const appName = config.get("appName");
const isEnableLoggerService = config.get("loggerService.enable");
const loggerServiceHost = config.get("loggerService.host");
const loggerServicePath = config.get("loggerService.path");
const loggerServicePort = config.get("loggerService.port");
const loggerServiceSsl = config.get("loggerService.ssl");
const loggerServiceHeader = config.get("loggerService.header");
let logger ;

const initLogger = () => {
  logger = createWinstonLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: appName},        
  })
  if(isEnableLoggerService){
    logger.add( new transports.Http({
      host: loggerServiceHost,
      path: loggerServicePath,
      port: loggerServicePort,
      ssl: loggerServiceSsl, 
      headers: {
        ...loggerServiceHeader
      },
      
    }));
  }
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new DebugTransport({}));    
  }
}
export const getLogger = () => {
  if(!logger){
    initLogger()
  }

  return logger;
}


