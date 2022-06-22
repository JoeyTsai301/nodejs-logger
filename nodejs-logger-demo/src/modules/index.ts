import { createLogger } from 'joey-nodejs-logger';
const logger = createLogger('modules:auth');

export const printText = (printText) => {
  return new Promise(async (resolve,reject)=> {
    try{
      logger.info(printText);
      return resolve(null)
    }catch(err){
      logger.error(err);
      resolve(null);
    }  
  })
}
