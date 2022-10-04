import { Request, Response } from 'express';
import DeleteFileAction from '../Application/Files/DeleteFileAction';

export default class RemoveFileDeleteController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const removedFile = await new DeleteFileAction().execute(id);

    if (removedFile instanceof Error) {
      return res.status(400).json({ error: removedFile.message });
    }

    return res.status(200).json({
      file: removedFile
    });
  }
}
