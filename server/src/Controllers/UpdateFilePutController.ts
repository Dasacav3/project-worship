import { Request, Response } from 'express';
import UpdateFileAction from '../Application/Files/UpdateFileAction';

export default class UpdateFilePutController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, category } = req.body;

    const updatedFile = await new UpdateFileAction().execute(id, name, category);

    if (updatedFile instanceof Error) {
      return res.status(400).json({ error: updatedFile.message });
    }

    return res.status(200).json({
      file: updatedFile
    });
  }
}
