import {ReflectiveInjector} from 'injection-js';
import {ExecutableSchema} from '../graphql/ExecutableSchema';
import {CommonConfig} from '../config/CommonConfig';
import {ExpressWebServer} from '../webserver/ExpressWebServer';
import {MockData} from '../graphql/schemas/MockData';
import {AuthorSchema} from '../graphql/schemas/author/AuthorSchema';
import {QuerySchema} from '../graphql/schemas/QuerySchema';
import {SchemaArray} from '../graphql/SchemaArray';
import {PostSchema} from '../graphql/schemas/post/PostSchema';
import {MutationSchema} from '../graphql/schemas/MutationSchema';
import {SchemaDefinition} from '../graphql/schemas/SchemaDefinition';

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
    ];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
