import { Model, DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import sequelize from "../config/sequelize";
import dotenv from "dotenv";

dotenv.config();

class User extends Model {
  private userid!: number;
  private email!: string;
  private role: string = "user";

  public generateToken(): string {
    console.log("Generating token for user:", this.email);
    const payload = { userid: this.userid, email: this.email, role: this.role };
    const secret = process.env.JWT_KEY;
    if (!secret) {
      throw new Error("JWT key not found");
    }
    return jwt.sign(payload, secret);
  }
}

User.init(
  {
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
    modelName: "User",
    tableName: "user",
    timestamps: false,
  }
);

export default User;
