import Transport from "winston-transport";
import debug from "debug";

class DebugTransport extends Transport {
  constructor(opts) {
    super(opts);    
  }

  log(info, callback) {
    setImmediate(() => {      
      debug(`${info.service}:${info.label}`)(info.message)      
    });

    callback();
  }
};

export default DebugTransport;