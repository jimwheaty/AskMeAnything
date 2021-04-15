import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) 
    private questionModel: typeof Question,
  ) {}



  async findAll(): Promise<Question[]> {
    return this.questionModel.findAll();
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionModel.findOne({
      where: { id },
    });
    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found!`);
    }
    return question;
  }

  create(question: Question): Promise<Question> {
    if (!question.title || !question.body) {
      throw new BadRequestException('Missing title or body of the question');
    }
    return this.questionModel.create(question);
  }

  async update(id: string, questionUpdate: Question): Promise<Question> {
    const question = await this.findOne(id);
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