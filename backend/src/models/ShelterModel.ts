import sequelize from "../config/sequelize";
import { DataTypes, Model } from "sequelize";
import jwt from "jsonwebtoken";

class Shelter extends Model {
  private shelterid!: number;
  private email!: string;

  public generateToken(): string {
    console.log("Generating token for shelter:", this.email);
    const payload = { shelterid: this.shelterid, email: this.email };
    const secret = "123456";
    return jwt.sign(payload, secret);
  }
}

Shelter.init(
  {
    shelterid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Approved", "Pending", "Rejected"),
      allowNull: false,
    },
    managed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Shelter",
    tableName: "shelter",
    timestamps: false,
  }
);

export default Shelter;
