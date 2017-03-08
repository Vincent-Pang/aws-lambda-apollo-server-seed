import {Injectable} from 'injection-js';
import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-tools';
import {SchemaArray} from './SchemaArray';
import {merge} from 'lodash';

@Injectable()
export class ExecutableSchema
{
    public readonly executableSchema: GraphQLSchema;

    public constructor(schemaArray: SchemaArray)
    {
        const schemaStrList = schemaArray.schemas.map( (v) => v.getSchemaStr() );

        const mergedResolvers = schemaArray.schemas.reduce( (acc, v) => merge(acc, v.getResolverObj()), {} );

        this.executableSchema = makeExecutableSchema({
            typeDefs: schemaStrList,
            resolvers: mergedResolvers
        });
    }
}
