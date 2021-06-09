import { Tag } from './tags.model';
import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(newTag: Tag): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findOne(id: number): Promise<Tag>;
    update(id: number, updateTag: Tag): Promise<Tag>;
    remove(id: number): Promise<void>;
}
