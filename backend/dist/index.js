"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./config/server"));
const database_1 = __importDefault(require("./config/database"));
const PetRoutes_1 = __importDefault(require("./routes/PetRoutes"));
const port = process.env.PORT || 3000;
// server setup
server_1.default.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
server_1.default.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
// Database connection
database_1.default.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err.stack));
// Pets
server_1.default.use('/api', PetRoutes_1.default);
