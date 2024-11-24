import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Moderator extends Model {}

Moderator.init(
  {
    modid: {
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
    modelName: "Moderator",
    tableName: "moderator",
    timestamps: false,
  }
);

export default Moderator;
