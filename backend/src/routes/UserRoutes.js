import express from 'express';
import UserController from '../controllers/UserController.js';
import { checkAuth } from '../helpers/checkAuth.js';
const routes = express.Router();

checkAuth
routes.post('/', UserController.register);
routes.post('/login', UserController.login);

routes.use(checkAuth);
routes.get('/', UserController.getUserByToken);
routes.get('/:id', UserController.getUserById);

export default routes;

