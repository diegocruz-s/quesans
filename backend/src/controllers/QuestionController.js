import { getToken } from "../helpers/getToken.js";
import { getUserToken } from "../helpers/getUserToken.js";
import Question from '../models/Question.js'
import Answer from '../models/Answer.js'

class QuestionController {
    test(req,res){
        res.json('Ok question');
    }

    async showQuestions(req,res){
        try {
            const questions = await Question.findAll({});

            if(!questions){
                return res.status(404).json({ error: 'Perguntas não encontrada!' })
            }

            return res.status(200).json(questions)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error show questions!' })
        }
    }

    async showQuestionsUser(req,res) {
        try {
            const token = await getToken(req);
            const user = await getUserToken(token);

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            const questions = await Question.findAll({ raw: true, where: { UserId: user.id } });

            if(!questions){
                return res.status(404).json({ error: 'Perguntas não encontradas!' })
            }

            return res.status(200).json(questions);

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error show questions!' })
        }
    }

    async create(req,res){
        try {
            const token = await getToken(req);
            const user = await getUserToken(token);

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            const { title, description } = req.body;

            if(!title || !description){
                return res.status(422).json({ error: 'Dados inválidos!' })
            }

            const question = { 
                title, 
                description, 
                UserId: user.id, 
                userEmail: user.email, 
                userName: user.name    
            };

            const newQuestion = await Question.create(question);

            if(!newQuestion){
                return res.status(422).json({ error: 'Erro na crição da pergunta!' })
            }

            return res.status(201).json({
                success: 'Pergunta criada!',
                question: newQuestion
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error show questions!' })
        }
    }

    async questionId(req,res){
        try {
            const { id } = req.params;

            const question = await Question.findOne({ include: Answer, where: { id } });

            if(!question){
                return res.status(404).json({ error: 'Pergunta não encontrada!' });
            }

            return res.status(200).json(question);

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error show question!' })
        }

    }

    async update(req,res){
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const question = await Question.findOne({ raw: true, where: { id } });

            if(!question){
                return res.status(404).json({ error: 'Pergunta não encontrada!' });
            }

            if(title){
                question.title = title;
            }
            if(description){
                question.description = description;
            }

            await Question.update(question, { where: { id } });

            return res.status(201).json({
                success: 'Pergunta atualizada!',
                question
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error update question!' });            
        }
    }

    async delete(req,res){
        try {
            const { id } = req.params;

            const question = await Question.findOne({ where: { id } });

            if(!question){
                return res.status(404).json({ error: 'Pergunta não encontrada!' });
            }

            const deleteQuestion = await Question.destroy({ where: { id } });

            return res.status(200).json({ success: 'Pergunta deletada!' });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error delete question!' });
        }

    }
    
}

export default new QuestionController();