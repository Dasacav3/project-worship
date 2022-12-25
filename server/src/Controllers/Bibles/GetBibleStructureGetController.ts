import { Request, Response } from 'express';
import GetBibleStructureAction from '../../Application/Bibles/GetBibleStructureAction';

export default class GetBibleStructureGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const getBibleStructureAction = new GetBibleStructureAction();
    const bibleStructure = await getBibleStructureAction.execute();

    return res.status(200).json(bibleStructure);
  }
}
