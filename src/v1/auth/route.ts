import { Router } from 'express';
import Controller from './controller';

const route: Router = Router();
const controller = new Controller();

// Sign the user in
route.post('/authenticate', controller.authenticate);
route.post('/register', controller.register);

export default route;