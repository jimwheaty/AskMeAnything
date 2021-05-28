import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
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
        if (!userId) userId = 'all';
        if (!year) throw new BadRequestException('missing year parameter');
        if (!month) throw new BadRequestException('missing month parameter');

        if (userId === 'all') {
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
                    '$year$': year,
                    '$month$': month
                }
            });
            if (!questions) return [];
            return questions;

        } else {
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
            });
            if (!questions) return [];
            return questions;
        }

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



    async getPopularTags(limit: string): Promise<Tag[]> {   
        if (!limit) limit = 'all'; 
        
        const popularTags = await this.tagModel.findAll({
            attributes: [
                'field',
                [Sequelize.fn('COUNT'), 'count']
            ],
            order:  [[sequelize.literal('count'), 'DESC']],
            group: 'field',
        });

        if (!popularTags) return [];

        return limit === 'all'? popularTags:  popularTags.slice(0, parseInt(limit));
    }


}
