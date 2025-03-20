import { Request, Response, NextFunction } from "express";
import { register } from "module";

interface TimeInterval {
  timeInterval: number;
}

interface lastCall {
  time: number;
}

const reqByIp: Record<string, number> = {};

export default function limiter(
  time: lastCall,
  delay: TimeInterval = { timeInterval: 1000 }
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();

    if (!req.ip)
      return res.status(403).type("text/html").send("<h1>Access Denied</h1>");

    const last = reqByIp[req.ip] || 0;

    if (now - last >= delay.timeInterval) {
      console.log("ok you go");
      reqByIp[req.ip] = now;
      return next();
    }

    res.type("text/html").send("<h1> ERRRRROR </h1>");

    // if (req.ip) {
    //   if (!reqByIp[req.ip]) {
    //     console.log("ok you go");
    //     reqByIp[req.ip] = now;
    //     return next();
    //   } else if (now - reqByIp[req.ip] >= delay.timeInterval) {
    //     console.log("ok you go");
    //     reqByIp[req.ip] = now;
    //     return next();
    //   } else {
    //     console.log("error sdsdsq!");
    //     res.type("text/html");
    //     res.send("<h1> ERRRRROR </h1>");
    //   }
    // }
  };
}
