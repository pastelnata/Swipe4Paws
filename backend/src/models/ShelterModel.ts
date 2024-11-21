import sequelize from "../config/sequelize";
import { DataTypes, Model } from "sequelize";

class Shelter extends Model {
    private shelterid!: number;
    private email!: string;
    private name!: string;
    private password!: string;
    private address!: string;
    private city!: string;
    private postal_code!: number;
    private status!: 'Approved' | 'Pending' | 'Denied';
};

Shelter.init(
    {
        shelterid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     ['len']: [4, 12]
            // }
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
            type: DataTypes.ENUM('Approved', 'Pending', 'Rejected'),
            allowNull: false,
        },
        managed_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Shelter',
        tableName: 'shelter',
        timestamps: false,
    }
);

export default Shelter;
