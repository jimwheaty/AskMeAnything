import { Tag } from './tags.model';
export declare class TagsService {
    private tagModel;
    constructor(tagModel: typeof Tag);
    create(newTag: Tag): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findOne(id: number): Promise<Tag>;
    update(id: number, tagUpdate: Tag): Promise<Tag>;
    remove(id: number): Promise<void>;
}
