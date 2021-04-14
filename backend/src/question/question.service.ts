import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.questionModel.create(question);
  }

  async update(id: string, questionUpdate: Question): Promise<Question> {
    const question = await this.findOne(id);
    question.title = questionUpdate.title? questionUpdate.title: question.title;
    question.core  = questionUpdate.core?  questionUpdate.core: question.core;
    await question.save()
    return question
  }

  async remove(id: string): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}