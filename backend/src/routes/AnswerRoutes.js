import express from 'express';
import AnswerController from '../controllers/AnswerController.js';
import { checkAuth } from '../helpers/checkAuth.js';
const routes = express.Router();

routes.post('/:id', checkAuth, AnswerController.create);

export default routes;