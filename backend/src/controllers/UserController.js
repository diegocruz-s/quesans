import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../helpers/generateToken.js';
import { getUserToken } from '../helpers/getUserToken.js';
import { getToken } from '../helpers/getToken.js';

class UserController {

    async register(req,res){
        const { name, email, password, confirmPassword } = req.body;

        if(!name || !email || !password || !confirmPassword){
            return res.status(422).json({ error: 'Dados inválidos!' })
        }

        if(password !== confirmPassword){
            return res.status(422).json({ error: 'As senhas devem ser iguais!' })
        }

        const existsUser = await User.findOne({ raw: true, where: { email } });

        if(existsUser){
            return res.status(422).json({ error: 'Usuário já registrado!' });
        }

        const hashPasswrod = bcrypt.hashSync(password);

        const user = { name, email, password: hashPasswrod } 

        try {
            const newUser = await User.create(user);

            const token = await generateToken(newUser);

            delete newUser.password

            return res.status(201).json({
                success: 'Usuário criado com sucesso!',
                token,
                user: newUser
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error register user!' })
        }


    }

    async login(req,res){

        try {
            const { email, password } = req.body;

            if(!email || !password){
                return res.status(422).json({ error: 'Dados inválidos!' })
            }

            const existsUser = await User.findOne({ 
                raw: true, 
                where: { email }, 
            });

            if(!existsUser){
                return res.status(404).json({ error: 'Autenticação inválida!' })
            }

            const verifyPass = bcrypt.compareSync(password, existsUser.password);

            if(!verifyPass){
                return res.status(404).json({ error: 'Autenticação inválida!' })
            }

            const token = await generateToken(existsUser);

            delete existsUser.password;

            return res.status(200).json({
                success: 'Autenticação realizada!',
                token,
                user: existsUser
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error login user!' })
        }

    }

    async getUserById(req,res){
        try {
            const { id } = req.params;
            const user = await User.findOne({ raw: true, where: { id } });

            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }

            return res.status(200).json(user);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error userId!' })
        }

    
    }

    async getUserByToken(req,res){
        try {
            const token = await getToken(req);
            if(!token){
                return res.status(401).json({ error: 'Invalid token!' })
            }
            const user = await getUserToken(token);
            if(!user){
                return res.status(404).json({ error: 'Usuário não encontrado!' })
            }

            return res.status(200).json(user);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error userToken!' })
        }
        
    }

}

export default new UserController();

