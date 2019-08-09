import { Router } from 'express';
import users from './user/route';
import auth from './auth/route';

const route: Router = Router();

route.use('/users', users);
route.use('/', auth); 

export default route;