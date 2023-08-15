import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './db/connection';
// load bot commands
import "./commands"


(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()