import {ISchema} from '../ISchema';
import {Injectable} from 'injection-js';
import {MockData} from '../MockData';
import {find} from 'lodash';

@Injectable()
export class PostSchema implements ISchema
{
    public constructor(private readonly mockData: MockData)
    {
    }

    public getSchemaStr(): string
    {
        return `
            type Post {
                id: Int!
                title: String
                author: Author
                votes: Int
            }
        `;
    }

    public getResolverObj(): any
    {
        const mockAuthors = this.mockData.authors;

        return {
            Post: {
                author(post) {
                    return find(mockAuthors, { id: post.authorId });
                }
            }
        };
    }
}
