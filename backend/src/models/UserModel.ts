import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class User extends Model {}

User.init({
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{ 
    sequelize, 
    modelName: 'User',
    tableName: 'user'
});

export default User;