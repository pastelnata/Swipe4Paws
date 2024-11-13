import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class pet extends Model {
    private petid!: number;
    private name!: string;
    private gender!: 'Male' | 'Female' | 'Unknown';
    private age!: number;
    private date_added!: Date;
    private race!: string;
    private shelterid!: number;
    private photo!: string;
    private type!: string;
    // private behavior!: string;
}

pet.init(
    {
        petid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('Female', 'Male', 'Unknown'),
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        date_added: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        race: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },
        shelterid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },
        // behavior: {
        //     type: DataTypes.STRING(70),
        //     allowNull: true,
        // }
        photo: {
            type: DataTypes.STRING(70),
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'pet',
        timestamps: false
    }
)

export default pet;