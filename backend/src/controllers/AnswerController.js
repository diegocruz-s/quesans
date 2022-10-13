import { getToken } from "../helpers/getToken.js";
import { getUserToken } from "../helpers/getUserToken.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

class AnswerController {

    async create(req,res){
        try {
            const token = await getToken(req);
            const user = await getUserToken(token);
            const { id } = req.params;
            const { text } = req.body;
            const question = await Question.findOne({ raw: true, where: { id } });

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            if(!text){
                return res.status(422).json({ error: 'O comentário é obrigatório!' })
            }

            const newAnswer = {
                text,
                userName: user.name,
                userIdAnswer: user.id,
                QuestionId: question.id
            }

            const answer = await Answer.create(newAnswer);

            if(!answer){
                return res.status(422).json({ error: 'Erro na criação da resposta!' })
            }

            return res.status(201).json({
                success: 'Resposta criada!',
                answer
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error create answer!' });
        }
    }

}

export default new AnswerController();