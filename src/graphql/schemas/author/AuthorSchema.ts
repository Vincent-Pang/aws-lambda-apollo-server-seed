import {ISchema} from '../ISchema';
import {Injectable} from 'injection-js';
import {filter} from 'lodash';
import {PostService} from '../../../services/PostService';

@Injectable()
export class AuthorSchema implements ISchema
{
    public constructor(private readonly postService: PostService)
    {
    }

    public getSchemaStr(): string
    {
        return `
            type Author {
                id: Int! # the ! means that every author object _must_ have an id
                firstName: String
                lastName: String
                posts: [Post] # the list of Posts by this author
            }
        `;
    }

    public getResolverObj()
    {
        const mockPosts = this.postService.getPosts();

        return {
            Author: {
                posts(author) {
                    return filter(mockPosts, {authorId: author.id});
                }
            }
        };
    }
}
