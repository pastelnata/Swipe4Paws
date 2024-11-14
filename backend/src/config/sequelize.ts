import { Sequelize } from 'sequelize';

// Database connection
const sequelize = new Sequelize(
{
    //Configuration
    dialect: 'postgres',
    logging: console.log,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

export default sequelize;