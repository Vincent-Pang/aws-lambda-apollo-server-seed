import {Injectable} from 'injection-js';

@Injectable()
export class MockData
{
    public readonly posts = [
        { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
        { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
        { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 }
    ];

    public readonly authors = [
        { id: 1, firstName: 'Tom', lastName: 'Coleman' },
        { id: 2, firstName: 'Sashko', lastName: 'Stubailo' }
    ];
}
