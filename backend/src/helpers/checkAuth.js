import jwt from 'jsonwebtoken';
import 'dotenv/config';
const jwtSecret = process.env.SECRET_TOKEN;

export const checkAuth = async function(req, res, next) {
    if(!req.headers.authorization){
        return res.status(422).json({ error: 'Access denied!' })
    };

    const token = await req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(422).json({ error: 'Access denied!!' })
    }

    try {
        const checkToken = jwt.verify(token, jwtSecret); 

        req.user = checkToken;

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: 'Invalid Token!' })
    }

};

