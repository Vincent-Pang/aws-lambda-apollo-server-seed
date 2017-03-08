import {MockData} from './MockData';
import {Injectable} from 'injection-js';

@Injectable()
export class PostService
{
    public constructor(private mockData: MockData)
    {
    }

    public getPosts()
    {
        return this.mockData.posts;
    }
}
