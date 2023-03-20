import { Request, Response } from 'express';
import GetSongsAction from '../../Application/Songs/GetSongsAction';

export default class GetSongsListGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const search = req.query.search ? req.query.search as string : '';
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const entries = req.query.entries ? parseInt(req.query.entries as string) : 10;

    const songs = await new GetSongsAction().execute(page, entries, search);

    return res.json(songs);
  }
}
