import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('test', 'root', 'Mysql8@admin', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});