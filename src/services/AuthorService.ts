import {MockData} from './MockData';
import {Injectable} from 'injection-js';

@Injectable()
export class AuthorService
{
    public constructor(private mockData: MockData)
    {
    }

    public getAuthors()
    {
        return this.mockData.authors;
    }
}
