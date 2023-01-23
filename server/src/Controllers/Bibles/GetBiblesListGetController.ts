import { Request, Response } from 'express';
import GetBiblesAction from '../../Application/Bibles/GetBiblesAction';

export default class GetBiblesListGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const entries = req.query.entries ? parseInt(req.query.entries as string) : 10;

    const bibles = await new GetBiblesAction().execute(page, entries);

    return res.json(bibles);
  }
}
