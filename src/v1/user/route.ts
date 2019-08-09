import { Router } from 'express';
import auth from './../../middleware/auth';
import Controller from './controller';

const route: Router = Router();
const controller = new Controller();

route.get('/', controller.findAll);
route.get('/:id', auth, controller.findOne);
route.put('/:id', controller.update);
route.delete('/:id', controller.remove);

export default route;