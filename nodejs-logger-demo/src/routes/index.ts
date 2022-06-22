import { Request, Response } from "express";
import humps from 'humps';

import { createLogger } from 'joey-nodejs-logger';
const logger = createLogger('route:index');

import { printText } from '../modules/index';
import { ErrorStatus } from '../constants/apiStatus';


/**
 * list lessons, 
 * @param req.query coachId filter coach lessons 
 */
export const query = async (req: Request, res: Response, next) => {  
  try{    
    await printText("print text");
    logger.info("log");
    logger.debug("log");
    logger.warn("log");
    logger.error("log");
    
    res.json("ok");
  }
  catch(err){
    logger.error(err);
    const {status = ErrorStatus, message = err} = err as any;
    res.json({
      status,
      message,
    });
  }  
};