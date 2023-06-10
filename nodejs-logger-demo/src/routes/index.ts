import { Request, Response } from "express";
import humps from 'humps';

import { getLogger  } from '../../../src/index';
// joey-nodejs-logger
const label = 'routes:index'
const logger = getLogger();

import { printText } from '../modules/index';
import { ErrorStatus } from '../constants/apiStatus';


/**
 * list lessons, 
 * @param req.query coachId filter coach lessons 
 */
export const query = async (req: Request, res: Response, next) => {  
  try{    
    await printText("print text");
    logger.info("log", {label});
    logger.debug("log", {label});
    logger.warn("log", {label});
    logger.error("log", {label});
    
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