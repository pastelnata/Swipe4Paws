import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/sequelize';


class Favorite extends Model {
  petId!: number;
  userId!: number;
}

Favorite.init(
  {
    petid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pet',
        key: 'petid',
      },
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'userid',
      },
    },
  },
  {
    sequelize,
    modelName: 'favorite',
    tableName: 'favorite', 
    timestamps: false, 
  }
);

export default Favorite;
