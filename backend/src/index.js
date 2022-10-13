import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import conn from './database/conn.js';
import './database/conn.js'
import 'dotenv/config';
import './models/User.js';
import './models/Question.js';
import './models/Answer.js';
const PORT = process.env.PORT;

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors())
    }

    routes(){
        this.app.use(router);
    }
}

new App().app.listen(PORT, ()=>{
    console.log('Server running...');
})
conn.sync({ force: false });