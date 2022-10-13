import { DataTypes } from 'sequelize';
import db from "../database/conn.js";
import User from './User.js';

const Question = db.define('Question', {
    title: { type: DataTypes.STRING, require: true, allowNull: false },
    description: { type: DataTypes.STRING, require: true, allowNull: false },
    userEmail: { type: DataTypes.STRING, require: true, allowNull: false },
    userName: { type: DataTypes.STRING, require: true, allowNull: false },
});

Question.belongsTo(User);
User.hasMany(Question);

export default Question;
