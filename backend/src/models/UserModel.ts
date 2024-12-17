import { Model, DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import sequelize from "../config/sequelize";
import dotenv from "dotenv";
import TokenService from "../middleware/token";

dotenv.config();

class User extends Model {
  private userid!: number;
  private email!: string;
  private role: string = "user";
  private username!: string;
  private password!: string;

  //access password for checking in UserServices.ts (for login)
  public getPassword(): string {
    return this.password; 
  }

  public setPassword(password: string): void {
    this.password = password; 
  }

  public setUsername(username: string): void {
    this.username = username; 
  }

  public setEmail(email: string) {
    this.email = email;
  } 
  //get access to email for checking in login (UserServices.ts)
  public getEmail(): string {
    return this.email;
  }

  public getUserId(): number {
    return this.userid;
  }

  public generateToken(): string {
    try {
      console.log("Generating token for user:", this.email);
      return TokenService.generateToken(this.userid, this.email, this.username, this.role);
    } catch (error) {
      console.error("Error generating token:", error);
      throw error;
    }
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
