import sequelize from "../config/sequelize";
import { DataTypes, Model } from "sequelize";
import jwt from "jsonwebtoken";
import TokenService from "../middleware/token";

class Shelter extends Model {
  private shelterid!: number;
  private email!: string;
  private name!: string;
  private password!: string;
  private address!: string;
  private city!: string;
  private postal_code!: number;
  private status!: 'Approved' | 'Pending' | 'Denied';
  private photo!: string;
  private role: string = 'shelter';

    //access password for checking in shelterservices.ts (for login)
  public getPassword(): string {
    return this.password; 
  }

  public getEmail(): string {
    return this.email;
  }

  public getShelterId(): number {
    return this.shelterid;
  }

  public generateToken(): string {
    console.log("Generating token for shelter", this.email);
    return TokenService.generateToken(this.shelterid, this.email, this.role);
  }
};

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
    photo: {
      type: DataTypes.STRING(70),
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Shelter",
    tableName: "shelter",
    timestamps: false,
  }
);

export default Shelter;
