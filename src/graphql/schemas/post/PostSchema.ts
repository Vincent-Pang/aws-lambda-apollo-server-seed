import {ISchema} from '../ISchema';
import {Injectable} from 'injection-js';
import {find} from 'lodash';
import {AuthorService} from '../../../services/AuthorService';

@Injectable()
export class PostSchema implements ISchema
{
    public constructor(private readonly authorService: AuthorService)
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
        const mockAuthors = this.authorService.getAuthors();

        return {
            Post: {
                author(post) {
                    return find(mockAuthors, { id: post.authorId });
                }
            }
        };
    }
}
