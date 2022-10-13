import express from 'express';
import UserRoutes from './UserRoutes.js';
import AnswerRoutes from './AnswerRoutes.js';
import QuestionRoutes from './QuestionRoutes.js';

const app = express();

app.use('/users', UserRoutes);
app.use('/questions', QuestionRoutes);
app.use('/answers', AnswerRoutes);

export default app;

