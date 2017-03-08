import {ReflectiveInjector} from 'injection-js';
import {ExecutableSchema} from '../graphql/ExecutableSchema';
import {CommonConfig} from '../config/CommonConfig';
import {ExpressWebServer} from '../webserver/ExpressWebServer';
import {AuthorSchema} from '../graphql/schemas/author/AuthorSchema';
import {QuerySchema} from '../graphql/schemas/QuerySchema';
import {SchemaArray} from '../graphql/SchemaArray';
import {PostSchema} from '../graphql/schemas/post/PostSchema';
import {MutationSchema} from '../graphql/schemas/MutationSchema';
import {SchemaDefinition} from '../graphql/schemas/SchemaDefinition';
import {AuthorService} from '../services/AuthorService';
import {PostService} from '../services/PostService';
import {MockData} from '../services/MockData';

import {Logger, loggerFactory} from './Logger';

const PROVIDERS =
    [
        CommonConfig
        , ExecutableSchema
        , ExpressWebServer
        , MockData
        , AuthorSchema
        , PostSchema
        , QuerySchema
        , MutationSchema
        , SchemaDefinition
        , SchemaArray
        , AuthorService
        , PostService

        , {provide: Logger, useFactory: loggerFactory, deps: []}
    ];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
