const { Sequelize } = require('sequelize');

const dotenv = require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRESQL_CONNECTION_STRING);

async function connectDB() {
    await sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    }); 
}

class PostgreSqlDBHelper {
    static async synchronize() {
        try {
            await sequelize.sync({ force: false });
            console.log("Synchronized Table");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { PostgreSqlDBHelper, sequelize, connectDB };