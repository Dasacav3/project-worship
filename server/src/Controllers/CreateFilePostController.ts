import { Request, Response } from 'express';
import { generateUuid } from '../Infrastructure/Utils/Utils';
import UploadFileAction from '../Application/Files/UploadFileAction';

export default class CreateFilePostController {
  public execute(req: Request, res: Response): Response {
    const { originalname, mimetype, size, filename } = req.file || {};

    const file = new UploadFileAction().execute(
      {
        originalname,
        mimetype,
        size,
        filename
      },
      generateUuid(),
      <number>req.body.category || 0
    );

    return res.json({ message: 'Photo saved', file });
  }
}
