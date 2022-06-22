import express from 'express';

import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';

import { query } from './routes';
import { createLogger } from 'joey-nodejs-logger';
const logger = createLogger("app");
// class LoggerStream {
//   write(text: string) {
//       logger.info(text)
//   }
// };



// let loggerStream = new LoggerStream();
morgan.format('joey', ':method :url :status');
const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan("joey",{stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/query", query);

// catch 404 and forward to error handler
app.use(function(req, res, next) {  
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // response error json
  return res.json({'status': err.status, 'message': err.message});  
});

export = app;