import { DataTypes } from 'sequelize';
import db from "../database/conn.js";

const User = db.define('User', {
    name: { type: DataTypes.STRING, require: true, allowNull: false },
    email: { type: DataTypes.STRING, require: true, allowNull: false },
    password: { type: DataTypes.STRING, require: true, allowNull: false },
});

export default User;
