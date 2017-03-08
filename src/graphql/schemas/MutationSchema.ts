import {ISchema} from './ISchema';
import {Injectable} from 'injection-js';
import {find} from 'lodash';
import {PostService} from '../../services/PostService';

@Injectable()
export class MutationSchema implements ISchema
{
    public constructor(private readonly postService: PostService)
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
        const mockPosts = this.postService.getPosts();
        // const mockAuthors = this.mockData.authors;

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
