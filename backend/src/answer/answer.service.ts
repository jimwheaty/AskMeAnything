import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer)
    private answerModel: typeof Answer
  ) {}

  create(newAnswer: Answer): Promise<Answer> {
    if (!newAnswer.body) {
      throw new BadRequestException('Missing title of the answer');
    }
    return this.answerModel.create(newAnswer);
  }

  findAll() : Promise<Answer[]> {
    return this.answerModel.findAll();
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
