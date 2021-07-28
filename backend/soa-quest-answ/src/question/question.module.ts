import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './question.model';
import { Tag } from 'src/tags/tags.model';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forFeature([Question, Tag]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.REDIS,
      options: {
        url: 'reredis://localhost:6379'
      }
    }]),
    JwtModule.register({
      secret: 'saas-5',
      signOptions: { expiresIn: '6000s' }
    }),
],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
