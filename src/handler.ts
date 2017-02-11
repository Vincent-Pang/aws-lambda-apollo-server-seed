import {createServer, proxy} from 'aws-serverless-express';
import {Context} from 'aws-lambda';
import {INJECTOR} from './util/Injector';
import {ExpressWebServer} from './webserver/ExpressWebServer';

const expressWebServer = INJECTOR.get(ExpressWebServer) as ExpressWebServer;

expressWebServer.start();

const server = createServer(expressWebServer.rawExpress);

export function handler(event: any, context: Context)
{
    return proxy(server, event, context);
}

// 'use strict';
//
// //module.exports.handler = (event, context, callback) => {
// export const handler = (event, context, callback) => {
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//     }),
//   };
//
//   callback(null, response);
//
//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// };
