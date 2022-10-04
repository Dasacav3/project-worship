import { Request, Response } from 'express';
import GetFilesAction from '../Application/Files/GetFilesAction';

export default class GetFilesListGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const entries = req.query.entries ? parseInt(req.query.entries as string) : 10;

    const files = await new GetFilesAction().execute(page, entries);

    return res.json(files);
  }
}
