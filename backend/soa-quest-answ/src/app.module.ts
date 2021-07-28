import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';

// sqlite
const sequelizeModule = SequelizeModule.forRoot({
  database: './database.db',
  storage: './database.db',
  dialect: 'sqlite',
  autoLoadModels: true,
  synchronize: true,
  sync: {force: false},
  dialectOptions: {connectTimeout: 10000},
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000},
})

@Module({
  imports: [
    sequelizeModule, 
    QuestionModule, 
    AnswerModule, 
    UsersModule, 
    TagsModule,
  ],
})
export class AppModule {}
