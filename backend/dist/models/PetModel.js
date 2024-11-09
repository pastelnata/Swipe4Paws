"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class pet extends sequelize_1.Model {
}
pet.init({
    petid: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM('Female', 'Male', 'Unknown'),
        allowNull: true,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    date_added: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    race: {
        type: sequelize_1.DataTypes.STRING(70),
        allowNull: true,
    },
    shelterid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'pet',
});
exports.default = pet;
