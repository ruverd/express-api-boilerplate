import { Request, Response } from 'express';
import Model from './model';
import validate from './validate';

export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await Model.find();
      if (!users) return res.status(404).send({ success: false, message: 'Users not found', data: null });

      return res.status(200).send({ 
        success: true, 
        data: users 
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await Model.findById(req.params.id, { password: 0 });
      if (!user) return res.status(404).send({ success: false, message: 'User not found', data: null });
        
      res.status(200).send({
        success: true,
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { name, lastName, email, password } = req.body;
    try {
      const userUpdated = await Model.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name,
            lastName,
            email,
            password
          }
        },
        { new: true }
      );

      if (!userUpdated) return res.status(404).send({ success: false, message: 'User not found', data: null });
        
      res.status(200).send({
        success: true,
        data: userUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await Model.findByIdAndRemove(req.params.id);

      if (!user) return res.status(404).send({ success: false, message: 'User not found', data: null });
      
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

}