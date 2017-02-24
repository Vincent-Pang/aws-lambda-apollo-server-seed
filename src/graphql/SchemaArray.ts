import {Injectable} from 'injection-js';
import {ISchema} from './schemas/ISchema';
import {SchemaDefinition} from './schemas/SchemaDefinition';
import {QuerySchema} from './schemas/QuerySchema';
import {AuthorSchema} from './schemas/author/AuthorSchema';
import {PostSchema} from './schemas/post/PostSchema';
import {MutationSchema} from './schemas/MutationSchema';

@Injectable()
export class SchemaArray
{
    public readonly schemas: ISchema[] = [];

    /* tslint:disable:align */
    public constructor(
        schemaDefinition: SchemaDefinition
        , querySchema: QuerySchema
        , mutationSchema: MutationSchema
        , authorSchema: AuthorSchema
        , postSchema: PostSchema
    )
    /* tslint:enable:align */
    {
        this.schemas.push(schemaDefinition);
        this.schemas.push(querySchema);
        this.schemas.push(mutationSchema);
        this.schemas.push(authorSchema);
        this.schemas.push(postSchema);
    }
}
