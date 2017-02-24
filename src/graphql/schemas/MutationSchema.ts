import {ISchema} from './ISchema';
import {Injectable} from 'injection-js';
import {MockData} from './MockData';
import {find} from 'lodash';

@Injectable()
export class MutationSchema implements ISchema
{
    public constructor(private readonly mockData: MockData)
    {
    }

    public getSchemaStr(): string
    {
        return `
            type Mutation {
                upvotePost(postId: Int!): Post
            }
        `;
    }

    public getResolverObj(): any
    {
        const mockPosts = this.mockData.posts;
        const mockAuthors = this.mockData.authors;

        return {
            Mutation: {
                upvotePost(_, {postId}) {
                    const post = find(mockPosts, {id: postId});
                    if (!post)
                    {
                        throw new Error(`Couldn't find post with id ${postId}`);
                    }
                    post.votes += 1;
                    return post;
                }
            }
        };
    }
}
