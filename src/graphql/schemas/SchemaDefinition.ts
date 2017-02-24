import {ISchema} from './ISchema';
import {Injectable} from 'injection-js';

@Injectable()
export class SchemaDefinition implements ISchema
{
    public getSchemaStr(): string
    {
        return `
            schema {
                query: Query
                mutation: Mutation
            }
        `;
    }

    public getResolverObj()
    {
        return {};
    }
}
