import {makeExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from 'graphql';

import { find, filter } from 'lodash';
import {Injectable} from 'injection-js';
import {Request} from 'express-serve-static-core';
import {RequestContext} from '../webserver/RequestContext';

@Injectable()
export class ExecutableSchema
{
    // private static EXECUTABLE_SCHEMA: GraphQLSchema = null;

    public readonly executableSchema: GraphQLSchema;

    public constructor()
    {
        this.executableSchema = makeExecutableSchema({
            typeDefs: schema,
            resolvers: resolveFunctions
        });
    }

//     public static getExecutableSchema(): GraphQLSchema
//     {
//         if (null === ExecutableSchema.EXECUTABLE_SCHEMA)
//         {
// ExecutableSchema.EXECUTABLE_SCHEMA = makeExecutableSchema({
//   typeDefs: schema,
//   resolvers: resolveFunctions
// });
//         }
//
//         return ExecutableSchema.EXECUTABLE_SCHEMA;
//     }
}

const schema = `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}

type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}

# the schema allows the following query:
type Query {
  posts: [Post]
  hello: String
  event: String
  context: String
}

# this schema allows the following mutation:
type Mutation {
  upvotePost (
    postId: Int!
  ): Post
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];

const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
    hello(obj, args, context, info)
    {
        //const req: RequestContext = context;
        //return req.rawExpressRequest.header('x-apigateway-context');
        // return req.expressRequest.header('x-apigateway-event');

        return 'Hello World';
    },
    event(obj, args, context, info)
    {
        const req: RequestContext = context;
        return req.awsEvent ? JSON.stringify(req.awsEvent) : null;
    },
    context(obj, args, context, info)
    {
        const req: RequestContext = context;
        return req.awsContext ? JSON.stringify(req.awsContext) : null;
    }
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    }
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    }
  },
  Post: {
    author(post) {
      return find(authors, { id: post.authorId });
    }
  }
};
