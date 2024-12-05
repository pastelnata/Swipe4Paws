import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import jwt from "jsonwebtoken";
import TokenService from "../middleware/token";

class Moderator extends Model {
  modid!: number;
  email!: string;
  role: string = "moderator";
  
  public generateToken(): string {
    console.log("Generating token for user:", this.email);
    return TokenService.generateToken(this.modid, this.email, this.role);
  }
}

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
