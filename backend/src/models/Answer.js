import { DataTypes } from "sequelize";
import db from '../database/conn.js';
import Question from "./Question.js";

const Answer = db.define('Answer', {
    text: { type: DataTypes.STRING, require: true, allowNull: false },
    userName: { type: DataTypes.STRING, require: true, allowNull: false },
    userIdAnswer: { type: DataTypes.STRING, require: true, allowNull: false },
});

Answer.belongsTo(Question);
Question.hasMany(Answer);

export default Answer;