import {Injectable} from 'injection-js';

@Injectable()
export class CommonConfig
{
    public readonly PORT: number = 3000;

    public readonly STAGE: string = '';

    public constructor()
    {
        this.STAGE = process.env.STAGE ? process.env.STAGE : '';
    }
}
