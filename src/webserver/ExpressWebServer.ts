import {Injectable, Inject} from 'injection-js';
import {CommonConfig} from '../config/CommonConfig';
import {ExecutableSchema} from '../graphql/ExecutableSchema';
import {Express, Request, Response, NextFunction} from 'express-serve-static-core';
import {graphiqlExpress, graphqlExpress} from 'graphql-server-express';
import {GraphQLOptions} from 'graphql-server-core';
import {RequestContext} from './RequestContext';

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import {LoggerInstance} from 'winston';
import {Logger} from '../util/Logger';

@Injectable()
export class ExpressWebServer
{
    public readonly rawExpress: Express = express();

    /* tslint:disable:align */
    public constructor(private config: CommonConfig
                       , private schema: ExecutableSchema
                       , @Inject(Logger) private logger: LoggerInstance)
    /* tslint:enable:align */
    {
        // setup this before other routes
        this.setupCors(this.rawExpress);

        this.setupAwsMiddleware(this.rawExpress);

        this.setupGraphql(this.rawExpress, schema);

        this.setupGraphiql(this.rawExpress, config);
    }

    public start(): void
    {
        this.logger.debug('start express listening')
        this.rawExpress.listen(this.config.PORT);
    }

    private setupCors(express: Express): void
    {
        // sync the cors setting with aws api gateway as similar as possible
        const corsConfig =
            {
                origin : '*'
                , methods : 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT' // copy default setting of api gateway
                , preflightContinue : false
                , optionsSuccessStatus : 200 // default 204, but the default of aws api gateway is 200
                // copy setting of api gateway
                , allowedHeaders : 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,_headers,_normalizednames'
            };

        express.use( cors(corsConfig) );
        express.options( '*', cors(corsConfig) ); // include before other routes
    }

    private setupAwsMiddleware(express: Express): void
    {
        express.use( awsServerlessExpressMiddleware.eventContext() );
    }

    private setupGraphql(express: Express, schema: ExecutableSchema): void
    {
        this.rawExpress.use('/graphql', bodyParser.json(), graphqlExpress(
            (req?: express.Request, res?: express.Response): GraphQLOptions =>
            {
                const requestContext = new RequestContext(req);

                this.logger.debug(requestContext.toString());

                return {
                    schema: schema.executableSchema
                    , context: requestContext
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
