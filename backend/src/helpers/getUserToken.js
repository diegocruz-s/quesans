import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';
const jwtSecret = process.env.SECRET_TOKEN;

export const getUserToken = async function(token){
    try {
        const verifyToken = jwt.verify(token, jwtSecret);

        const user = await User.findOne({ raw: true, where: { id: verifyToken.userId } });

        return user;

    } catch (error) {
        console.log(error);
    }
}