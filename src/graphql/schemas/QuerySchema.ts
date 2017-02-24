import {ISchema} from './ISchema';
import {RequestContext} from '../../webserver/RequestContext';
import {Injectable} from 'injection-js';
import {MockData} from './MockData';

@Injectable()
export class QuerySchema implements ISchema
{
    public constructor(private readonly mockData: MockData)
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
        const mockPosts = this.mockData.posts;
        const mockAuthors = this.mockData.authors;

        return {
            Query: {
                posts()
                {
                    return mockPosts;
                }
                , hello(obj, args, context, info)
                {
                    return 'Hello World';
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
