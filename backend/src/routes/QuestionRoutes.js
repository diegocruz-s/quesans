import express from 'express';
import QuestionController from '../controllers/QuestionController.js';
import { checkAuth } from '../helpers/checkAuth.js';

const routes = express.Router();

routes.get('/all', QuestionController.showQuestions);
routes.get('/', checkAuth, QuestionController.showQuestionsUser);
routes.post('/', checkAuth, QuestionController.create);
routes.get('/:id', checkAuth, QuestionController.questionId);
routes.put('/:id', checkAuth, QuestionController.update);
routes.delete('/:id', checkAuth, QuestionController.delete);

export default routes;