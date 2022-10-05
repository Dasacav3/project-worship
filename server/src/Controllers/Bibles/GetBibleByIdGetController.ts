import { Request, Response } from 'express';
import GetBibleByIdAction from '../../Application/Bibles/GetBibleByIdAction';

export default class GetBibleByIdGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const id = typeof req.params.id === 'number' ? req.params.id : parseInt(req.params.id);
    const bible = await new GetBibleByIdAction().execute(id);

    if (bible instanceof Error) {
      return res.status(404).json({
        message: bible.message
      });
    }

    return res.status(200).json(bible);
  }
}
