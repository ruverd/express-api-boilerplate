import jwt from 'jsonwebtoken';
import config from './../config/config';
import { Request, Response, NextFunction } from 'express';

const jwtPrivateKey: string = config.JWT_ENCRYPTION;
const requireAuth:  string | boolean = config.REQUIRE_AUTH;

interface IUserRequest extends Request {
  user: any
}

export default async (req: IUserRequest, res: Response, next: NextFunction): Promise<any> => {
  
  if (!requireAuth) return next();

  const token: string = req.headers.authorization.split(' ')[1];

  if (!token) return res.status(404).send({ success: false, message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);    
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send({
      success: false, 
      message: ex.message
    });
  }
};