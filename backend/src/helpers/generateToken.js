import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = function(user){
    const token = jwt.sign({
        userId: user.id,
        userEmail: user.email,
    }, process.env.SECRET_TOKEN, {
        expiresIn: '7d',
    });

    return token;
}
