import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import jwt from "jsonwebtoken";
import TokenService from "../middleware/token";

class Moderator extends Model {
  private modid!: number;
  private email!: string;
  private username!: string;
  private password!: string;
  role: string = "moderator";

  public getPassword(): string {
    return this.password;
  }
  //get access to password for checking in login (ModServices.ts)
  public getEmail(): string {
    return this.email;
  }

  public getModeratorId(): number {
    return this.modid;
  }

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
