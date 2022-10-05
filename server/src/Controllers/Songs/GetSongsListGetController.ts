import { Request, Response } from 'express';
import GetSongsAction from '../../Application/Songs/GetSongsAction';

export default class GetSongsListGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const entries = req.query.entries ? parseInt(req.query.entries as string) : 10;

    const songs = await new GetSongsAction().execute(page, entries);

    return res.json(songs);
  }
}
