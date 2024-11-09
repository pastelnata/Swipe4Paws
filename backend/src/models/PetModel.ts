import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class pet extends Model {
    private petid!: number;
    private gender!: 'Male' | 'Female' | 'Unknown';
    private age!: number;
    private date_added!: Date;
    private race!: string;
    private shelterid!: number;
}

pet.init(
    {
        petid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        }
    },
    {
        sequelize,
        tableName: 'pet',
        timestamps: false
    }
)

export default pet;