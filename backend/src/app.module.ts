import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer/answer.model';
import { AnswerModule } from './answer/answer.module';
import { Question } from './question/question.model';
import { QuestionModule } from './question/question.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
const db = require('../db.config.js');

const sequelizeModule = SequelizeModule.forRoot({
  host: db.HOST,
  username: db.USERNAME,
  password: db.PASSWORD,
  database: db.DATABASE,
  dialect: 'mysql',
  autoLoadModels: true,
  synchronize: true,
  sync: {force: false},
  dialectOptions: {connectTimeout: 10000},
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000},
  models: [Question, Answer, User]
})

@Module({
  imports: [
    sequelizeModule, 
    QuestionModule, 
    AnswerModule, 
    UsersModule
  ],
})
export class AppModule {}
