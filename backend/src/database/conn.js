import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASS_DB, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

try{
    sequelize.authenticate();
    console.log('DB loaded');
}catch(err){
    console.log(err);
}

export default sequelize; 