import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionModule } from './question/question.module';
const db = require('../db.config.js');

const sequelizeModule = SequelizeModule.forRoot({
  host: db.HOST,
  username: db.USERNAME,
  password: db.PASSWORD,
  database: db.DATABASE,
  dialect: 'mysql',
  autoLoadModels: true,
  synchronize: true,
  dialectOptions: {connectTimeout: 10000},
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000},
  models: []
})

@Module({
  imports: [sequelizeModule, QuestionModule],
})
export class AppModule {}
