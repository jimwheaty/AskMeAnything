import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { threadId } from 'node:worker_threads';
import { Question } from 'src/question/question.model';
import { Answer } from './answer.model';

@Injectable()
export class AnswerService {

  constructor(

    @Inject('AUTH_CLIENT')
    private readonly authClient: ClientProxy,

    @InjectModel(Answer)
    private answerModel: typeof Answer,

    @InjectModel(Question)
    private questionModel: typeof Question
  ) {}

  getUserFromJWT(jwt: string) {
    return this.authClient.send({role: 'auth', cmd: 'getUserFromJWT'}, jwt)
  }
  

  create(newAnswer: Answer): Promise<Answer> {
    if (!newAnswer.body) {
      throw new BadRequestException('Cannot create an empty answer');
    }
    return this.answerModel.create(newAnswer);
  }



  findAll() : Promise<Answer[]> {
    return this.answerModel.findAll();
  }



  async findPerUser(userId: number, limit: string): Promise<Answer[]> {

    if (!userId) throw new BadRequestException('Missing userId');
    if (!limit) limit = 'all';
    
    const answers = await this.answerModel.findAll({
      where: {userId}
    })
    if (!answers) return [];

    const sortedAnswers = [...answers].sort((a,b) => b.createdAt - a.createdAt); 

    return (limit === 'all')? sortedAnswers: sortedAnswers.slice(0,parseInt(limit));
  }



  async findPerQuestion(questionId: number): Promise<Question> {

    if (!questionId) throw new BadRequestException('Missing questionId');

    let answersPerQuestion = await this.questionModel.findByPk(questionId, {
      include: {
        model: Answer, 
        as: 'answers'
      }
    });

    answersPerQuestion.answers = answersPerQuestion.answers.sort((a, b) => b.upVotes - a.upVotes);
    
    return answersPerQuestion;
  }


  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerModel.findByPk(id);
    if (!answer) {
      throw new NotFoundException(`Answer with id ${id} not found!`);
    }
    return answer;
  }



  async update(id: number, answerUpdate: Answer): Promise<Answer> {
    const answer = await this.findOne(id);
    answer.body = answerUpdate.body? answerUpdate.body: answer.body;
    answer.upVotes = answerUpdate.upVotes? answerUpdate.upVotes: answer.upVotes;
    
    await answer.save();
    return answer;
  }



  async remove(id: number): Promise<void> {
    const answer = await this.findOne(id);
    await answer.destroy();
  }
}
