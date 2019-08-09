import { Request, Response } from 'express';
import User from './../user/model';
import validateAuthenticate from './validate';
import validateUser from './../user/validate';
import bcrypt from 'bcrypt';
import config from './../../config/config';
import _ from 'lodash';
import winston from 'winston';

export default class AuthController {
  public authenticate = async (req: Request, res: Response): Promise<any> => {
  
    try {
      const { error } = validateAuthenticate(req.body); 

      if (error) {
        return res.status(400).send({
          success: false,
          message: error.details[0].message,
          data: null
        });
      }
      
      let user = await User.findOne({ email: req.body.email });
      
      if (!user) {
        return res.status(400).send({
          success: false,
          message: 'Invalid email or password.',
          data: null
        });
      }

      const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).send({
          success: false,
          message: 'Invalid email or password.22',
          data: null
        });
      }
      
      const token: string = await user.generateAuthToken();
      res.status(200).send({
        success: true,
        message: 'Token generated Successfully',
        data: token
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<any> => {

    try {      

      const { name, email, password } = req.body;
      const { error } = validateUser(req.body); 

      if (error) {
        return res.status(400).send({
          success: false,
          message: error.details[0].message,
          data: null
        });
      }
      const salt: number = Number(config.SALT_ROUNDS);
      const hash: string = await bcrypt.hash(password, salt);
      const user = new User({
        name,
        email,
        password: hash
      });

      const newUser = await user.save();

      res.status(201).send({
        success: false,
        message: 'User Successfully created',
        data: newUser
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };
}