import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from 'src/answer/answer.model';
import { Tag } from 'src/tags/tags.model';
import { User } from 'src/users/users.model';
import { Question } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) 
    private readonly questionModel: typeof Question,

    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  async findAll(): Promise<Question[]> {

    const questions = await this.questionModel.findAll({
      include: [{
        model: Answer,
        as: 'answers',
        attributes: ['body']
      },{
        model: Tag,
        as: 'tags',
        attributes: ['field'],
      },{
        model: User,
        as: 'user',
        attributes: ['username'],
      }]
    });

    if (!questions) return [];

    let sortedQuestions = [...questions].sort((a,b) => b.updatedAt - a.updatedAt);
    return sortedQuestions;
  }



  async findOne(id: string): Promise<Question> {
    const question = await this.questionModel.findOne({
      where: { id },
    });
    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found!`);
    }
    question.views++;
    await question.save();
    return question;
  }



  async findPerUser(userId: number, limit: string): Promise<Question[]> {

    if (!userId) throw new BadRequestException('Missing userId');
    if (!limit) limit = 'all';

    const questions = await this.questionModel.findAll({
      where: { userId },
      include: { 
        model: Answer,
        as: 'answers'
       }
    })
    if (!questions) return [];

    const sortedQuestions = [...questions].sort((a,b) => a.createdAt - b.createdAt);

    if (limit === 'all') return sortedQuestions; 
    else return sortedQuestions.slice(0,parseInt(limit));
  }



  async findPerTag(tag: string, limit: string): Promise<Question[]> {

    if (!tag) throw new BadRequestException('Missing tag');
    if (!limit) limit = 'all';

    const questionsPerTag = await this.questionModel.findAll({
      where: {
        '$tags.field$': tag
      },
      include: {
        model: Tag,
        as: 'tags',
        attributes: ['field'],
      }
    });

    if (!questionsPerTag) return [];

    const sortedQuestions = [...questionsPerTag].sort((a,b) => a.createdAt - b.createdAt);
    return (limit === 'all')? sortedQuestions: sortedQuestions.slice(0,parseInt(limit));
  }


  create(question: Question): Promise<Question> {
    if (!question.title || !question.body) {
      throw new BadRequestException('Missing title or body of the question');
    }
    return this.questionModel.create(question);
  }



  async update(id: string, questionUpdate: Question): Promise<Question> {
    const question = await this.questionModel.findByPk(id);
    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found!`);
    }
    question.title = questionUpdate.title? questionUpdate.title: question.title;
    question.body  = questionUpdate.body?  questionUpdate.body: question.body;
    question.views  = questionUpdate.views?  questionUpdate.views: question.views;
    question.upVotes  = questionUpdate.upVotes?  questionUpdate.upVotes: question.upVotes;

    await question.save();
    return question;
  }


  
  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}