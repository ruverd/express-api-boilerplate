import { Router } from 'express';
import v1 from './v1/index';

const route: Router = Router();
const api = v1;

route.use('/api', api);
route.use('/api/v1', v1); 

export default route;