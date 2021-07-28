import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { Question } from 'src/question/question.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Answer, Question]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379'
      }
    }]),
    JwtModule.register({
      secret: 'saas-5',
      signOptions: { expiresIn: '6000s' }
    }),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService]
})
export class AnswerModule {}
