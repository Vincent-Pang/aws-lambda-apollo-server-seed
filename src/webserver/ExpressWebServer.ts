import {Injectable} from 'injection-js';
import {CommonConfig} from '../config/CommonConfig';
import {ExecutableSchema} from '../graphql/ExecutableSchema';
import {Express, Request, Response, NextFunction} from 'express-serve-static-core';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import {GraphQLOptions} from 'graphql-server-core';
import {RequestContext} from './RequestContext';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

@Injectable()
export class ExpressWebServer
{
    public readonly rawExpress: Express = express();

    public constructor(private config: CommonConfig, private schema: ExecutableSchema)
    {
        this.rawExpress.use(cors());

        this.setupGraphql(this.rawExpress, schema);

        this.setupGraphiql(this.rawExpress, config);
    }

    public start(): void
    {
        this.rawExpress.listen(this.config.PORT);
    }

    private setupGraphql(express: Express, schema: ExecutableSchema): void
    {
        this.rawExpress.use('/graphql', bodyParser.json(), graphqlExpress(
            (req?: express.Request, res?: express.Response): GraphQLOptions =>
            {
                return {
                    schema: schema.executableSchema
                    , context: new RequestContext(req)
                };
            } )
        );
    }

    private setupGraphiql(express: Express, config: CommonConfig): void
    {
        express.use('/graphiql', (req: Request, res: Response, next: NextFunction): any =>
        {
            const requestContext = new RequestContext(req);

            // if (requestContext.awsContext.identity.cognitoIdentityId
            if (true) // is admin
            {
                next();
            }
            // else
            // {
            //     res.status(403).send();
            // }
        });

        const graphiqlEndpointUrl = config.STAGE ? `/${config.STAGE}/graphql` : '/graphql';

        express.use('/graphiql', graphiqlExpress({endpointURL: graphiqlEndpointUrl}));
    }
}
