import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';
import Shelter from './ShelterModel';
import PetBehavior from './PetBehaviorModel';

class Pet extends Model {
    public petid!: number;
    private name!: string;
    private gender!: 'Male' | 'Female' | 'Unknown';
    private age!: number;
    private date_added!: Date;
    private race!: string;
    private shelterid!: number;
    private photo!: string;
    private type!: string;
}

Pet.init(
    {
        petid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        shelterid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_added: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        name: DataTypes.STRING(70),
        gender: DataTypes.ENUM('Female', 'Male', 'Unknown'),
        age: DataTypes.INTEGER,
        race: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING(70),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
    },
    {
        sequelize,
        modelName: 'Pet',
        tableName: 'pet',
        timestamps: true,
        createdAt: 'date_added',
        updatedAt: false,
    }
);

export default Pet;