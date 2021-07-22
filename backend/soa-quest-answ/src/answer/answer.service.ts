import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Question } from 'src/question/question.model';
import { Answer } from './answer.model';

@Injectable()
export class AnswerService {

  constructor(

    @InjectModel(Answer)
    private answerModel: typeof Answer,

    @InjectModel(Question)
    private questionModel: typeof Question
  ) {}


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


async getAnswersByDate(userId: string, year: string, month: string)  {
    if (!userId) userId = 'all';
    if (!year) throw new BadRequestException('missing year parameter');
    if (!month) throw new BadRequestException('missing month parameter');

    if (userId === 'all') {
        let answers = await this.answerModel.findAll({
            attributes: [
                [Sequelize.literal(`DATE("createdAt")`), 'date'],
                [Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                [Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                [Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                [Sequelize.literal(`COUNT(*)`), 'count']
            ],
            group: 'date',
            where: { 
                '$year$': year,
                '$month$': month
            }
        });   
        if (!answers) return [];
        return answers;

    } else {
        const answers = await this.answerModel.findAll({
            attributes: [
                [Sequelize.literal(`DATE("createdAt")`), 'date'],
                [Sequelize.literal(`strftime('%Y',"createdAt")`), 'year'],
                [Sequelize.literal(`strftime('%m',"createdAt")`), 'month'],
                [Sequelize.literal(`strftime('%d',"createdAt")`), 'day'],
                [Sequelize.literal(`COUNT(*)`), 'count']
            ],
            group: 'date',
            where: { 
                userId,
                '$year$': year,
                '$month$': month
            }
        });         
        if (!answers) return [];
        return answers;

    }
}



}
