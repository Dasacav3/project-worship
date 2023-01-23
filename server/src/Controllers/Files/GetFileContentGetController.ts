import fs from 'fs';
import File from '../../Domain/Entity/File/File';
import { Request, Response } from 'express';
import GetFileByIdAction from '../../Application/Files/GetFileByIdAction';

export default class GetFileContentGetController {
  public execute = async (req: Request, res: Response) => {
    const { id } = req.params;

    const file = await new GetFileByIdAction().execute(id);

    const filePath = `server/uploads/${file instanceof File ? file.getPath() : 'default.mp4'}`;

    // Check if file is image and return image content
    if (file instanceof File) {
      if (file.getType().split('/')[0] === 'image') {
        const image = fs.readFileSync(filePath);
        res.writeHead(200, {
          'Content-Type': file.getType(),
          'Content-Length': image.length,
          'Content-Disposition': `attachment; filename=${file.getName()}`
        });
        return res.end(image, 'binary');
      }
    }

    const range = req.headers.range || '';
    const fileSize = fs.statSync(filePath).size;

    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, fileSize - 1);

    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': file instanceof File ? file.getType() : 'video/mp4'
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(filePath, { start, end });

    stream.pipe(res);
  };
}
