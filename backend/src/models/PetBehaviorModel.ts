import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class PetBehavior extends Model {
  private behaviorid!: number;
  private petid!: number;
  private userid!: number;
  private behavior!: string;
}

PetBehavior.init(
  {
    behaviorid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    petid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    behavior: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "PetBehavior",
    tableName: "pet_behavior",
    timestamps: false,
  }
);

export default PetBehavior;
