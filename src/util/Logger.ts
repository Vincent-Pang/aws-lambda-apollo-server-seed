import {InjectionToken} from 'injection-js';
import {Winston, LoggerInstance} from 'winston';

import * as winston from 'winston';
import * as moment from 'moment';

export const Logger = new InjectionToken<LoggerInstance>('Winston');

export const loggerFactory = (): LoggerInstance =>
{
    return new winston.Logger
    (
        {
            transports:
            [
                new winston.transports.Console
                (
                    {
                        level: 'info'
                        , timestamp: () =>
                        {
                            return moment().format();
                        }
                        , formatter: (options) =>
                        {
                            return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message ? options.message : '')
                                   + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
                        }
                    }
                )
            ]
        }
    );
}
