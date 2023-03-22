import fs from 'fs';
import File from '../../Domain/Entity/File/File';
import { Request, Response } from 'express';
import GetFileByIdAction from '../../Application/Files/GetFileByIdAction';

export default class GetFileThumbnailGetController {
  public execute = async (req: Request, res: Response) => {
    const { id } = req.params;

    const file = await new GetFileByIdAction().execute(id);

    const thumbnailPath = `${file instanceof File ? file.getThumbnailPath() : 'server/uploads/thumbnail-default.jpg'}`;
    const thumbnailType = file instanceof File ? 'image/png' : 'image/jpeg';
    const thumbnailName = file instanceof File ? `${file.getName().split('.')[0]}.png` : 'thumbnail-default.jpg';

    const image = fs.readFileSync(thumbnailPath);

    res.writeHead(200, {
      'Content-Type': thumbnailType,
      'Content-Length': image.length,
      'Content-Disposition': `attachment; filename=${thumbnailName}`
    });

    return res.end(image, 'binary');
  };
}
