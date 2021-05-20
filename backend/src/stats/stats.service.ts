import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from 'src/question/question.model';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class StatsService {

    constructor(
        @InjectModel(Tag) 
        private readonly tagModel: typeof Tag,

        @InjectModel(Question) 
        private readonly questionModel: typeof Question 
    ) {}


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
