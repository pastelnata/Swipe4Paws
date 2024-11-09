"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PetController_1 = __importDefault(require("../controllers/PetController"));
const express_1 = require("express");
const petRoutes = (0, express_1.Router)();
const petController = new PetController_1.default();
// Defines the routes
petRoutes.get('/pets', petController.getAllPets);
exports.default = petRoutes;
