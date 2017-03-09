import {Request} from 'express-serve-static-core';
import {Context} from 'aws-lambda';

export class RequestContext
{
    public readonly awsEvent: any = null;
    public readonly awsContext: Context | null = null;

    public constructor(public readonly rawExpressRequest?: Request)
    {
        if (rawExpressRequest)
        {
            /* tslint:disable:no-string-literal */
            const apiGatewayParams = rawExpressRequest['apiGateway'];
            /* tslint:enable:no-string-literal */

            if (apiGatewayParams)
            {
                this.awsEvent   = apiGatewayParams.event;
                this.awsContext = apiGatewayParams.context;
            }

            // const eventStr: string = rawExpressRequest.header('x-apigateway-event');
            // const contextStr: string = rawExpressRequest.header('x-apigateway-context');
            //
            // this.awsEvent = eventStr ? JSON.parse(eventStr) : null;
            // this.awsContext = contextStr ? JSON.parse(contextStr) : null;
        }
    }

    public toString(): string
    {
        return `awsEvent = ${this.awsEvent}\n`
               + `awsContext = ${this.awsContext}`;
    }
}
