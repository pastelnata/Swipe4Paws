import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class PetBehavior extends Model {}

PetBehavior.init({
  behaviorid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  petid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  behavior: DataTypes.STRING,
},
{ 
    sequelize, 
    modelName: 'pet_behavior',
    tableName: 'pet_behavior'
});

export default PetBehavior;