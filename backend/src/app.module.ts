import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question/question.model';
import { QuestionModule } from './question/question.module';
const db = require('../db.config.js');

const sequelizeModule = SequelizeModule.forRoot({
  host: db.HOST,
  username: db.USERNAME,
  password: db.PASSWORD,
  database: db.DATABASE,
  dialect: 'mysql',
  autoLoadModels: true,
  sync: {force: false},
  dialectOptions: {connectTimeout: 10000},
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000},
  models: [Question]
})

@Module({
  imports: [sequelizeModule, QuestionModule],
})
export class AppModule {}
