import { Response,NextFunction,Request } from "express";
import jwt from "jsonwebtoken";
export const secret="varun";

interface UserRequest extends Request {
    user?: string;
  }  
  export const authenticate = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;  
    if (authHeader) {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, secret, (err, payload) => {
        if (err) {
          return res.status(403).json({ message: "Can not verify token" });
        }
        if (typeof payload === "object") {
          req.user = payload.username;
        }   
        next();
      });
    } else {
      res.status(401).json({ message: "Unauthorized: Missing 'Authorization' header" });
    }
  };
  