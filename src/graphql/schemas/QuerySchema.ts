import {ISchema} from './ISchema';
import {RequestContext} from '../../webserver/RequestContext';
import {Injectable} from 'injection-js';
import {PostService} from '../../services/PostService';

@Injectable()
export class QuerySchema implements ISchema
{
    public constructor(private readonly postService: PostService)
    {
    }

    public getSchemaStr(): string
    {
        return `
            type Query
            {
                posts: [Post]
                hello: String
                event: String
                context: String
            }
        `;
    }

    public getResolverObj(): any
    {
        const mockPosts = this.postService.getPosts();
        // const mockAuthors = this.mockData.authors;

        return {
            Query: {
                posts()
                {
                    return mockPosts;
                }
                , hello(obj, args, context, info)
                {
                    // throw 'sss';
                    return 'Hello World1234';
                }
                , event(obj, args, context, info): string | null
                {
                    const req: RequestContext = context;
                    return req.awsEvent ? JSON.stringify(req.awsEvent) : null;
                }
                , context(obj, args, context, info): string | null
                {
                    const req: RequestContext = context;
                    return req.awsContext ? JSON.stringify(req.awsContext) : null;
                }
            }
        };
    }
}
