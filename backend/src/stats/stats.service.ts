import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Answer } from 'src/answer/answer.model';
import { Question } from 'src/question/question.model';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class StatsService {

    constructor(
        @InjectModel(Tag) 
        private readonly tagModel: typeof Tag,

        @InjectModel(Question) 
        private readonly questionModel: typeof Question,

        @InjectModel(Answer)
        private readonly answerModel: typeof Answer
    ) {}

    async getQuestionsByDate(userId: string, year: string, month: string)  {
        if (!userId) throw new BadRequestException('missing userId parameter');
        if (!year) throw new BadRequestException('missing year parameter');
        if (!month) throw new BadRequestException('missing month parameter');

        const questions = await this.questionModel.findAll({
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
        })

        if (!questions) return [];
        return questions;
    }




    // TODO
    async getPopularTags(limit: string): Promise<any>{
        return;
        
        // interface response {
        //     count: number;
        // }

        // const popularTags: response = await this.tagModel.findAll({
        //     raw: true,
        //     attributes: [
        //         'field',
        //     ],
        //     group: [
        //         'field'
        //     ]
        // });
        // if (!popularTags) return [];

        // const sortedTags = popularTags.sort((a,b) => b.count - a.count);

        // return popularTags;
    }


}
