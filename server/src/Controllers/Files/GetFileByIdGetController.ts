import { Request, Response } from 'express';
import GetFileByIdAction from '../../Application/Files/GetFileByIdAction';

export default class GetFileByIdGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const file = await new GetFileByIdAction().execute(id);

    if (file instanceof Error) {
      return res.status(404).json({
        message: file.message
      });
    }

    return res.status(200).json(file);
  }
}
