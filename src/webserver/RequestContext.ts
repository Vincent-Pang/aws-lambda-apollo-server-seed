import {Request} from 'express-serve-static-core';
import {Context} from 'aws-lambda';

export class RequestContext
{
    public readonly awsEvent?: any = null;
    public readonly awsContext?: Context = null;

    public constructor(public readonly rawExpressRequest: Request)
    {
        if (rawExpressRequest)
        {
            const eventStr: string = rawExpressRequest.header('x-apigateway-event');
            const contextStr: string = rawExpressRequest.header('x-apigateway-context');

            this.awsEvent = eventStr ? JSON.parse(eventStr) : null;
            this.awsContext = contextStr ? JSON.parse(contextStr) : null;
        }
    }
}
