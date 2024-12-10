import { Model, DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import sequelize from "../config/sequelize";
import { PetBehavior } from "./associations";

class User extends Model {
  private userid!: number;
  private email!: string;
  private username!: string;
  private password!: string;

  //access password for checking in UserServices.ts (for login)
  public getPassword(): string {
    return this.password; 
  }
  //get access to email for checking in login (UserServices.ts)
  public getEmail(): string {
    return this.email;
  }

  public getUserId(): number {
    return this.userid;
  }

  public generateToken(): string {
    console.log("Generating token for user:", this.email);
    const payload = { userid: this.userid, email: this.email, role: "user" };
    const secret = "123456";
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
