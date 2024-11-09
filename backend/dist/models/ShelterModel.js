"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../config/sequelize"));
const sequelize_2 = require("sequelize");
class Shelter extends sequelize_2.Model {
}
;
Shelter.init({
    shelterID: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: sequelize_2.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_2.DataTypes.ENUM('Approved', 'Pending', 'Rejected'),
    },
}, {
    sequelize: sequelize_1.default,
    modelName: 'Shelter',
    tableName: 'shelter'
});
exports.default = Shelter;
