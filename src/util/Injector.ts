import {ReflectiveInjector} from 'injection-js';
import {ExecutableSchema} from '../graphql/ExecutableSchema';
import {CommonConfig} from '../config/CommonConfig';
import {ExpressWebServer} from '../webserver/ExpressWebServer';

const PROVIDERS =
    [
        CommonConfig
        , ExecutableSchema
        , ExpressWebServer
    ];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
