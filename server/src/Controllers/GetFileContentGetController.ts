import fs from 'fs';
import File from '../Domain/Entity/File/File';
import { Request, Response } from 'express';
import GetFileByIdAction from '../Application/Files/GetFileByIdAction';

export default class GetFileContentGetController {
  public execute = async (req: Request, res: Response) => {
    const { id } = req.params;

    const file = await new GetFileByIdAction().execute(id);

    if (file instanceof Error) {
      res.status(400).json({ error: file.message });
    }

    const range = req.headers.range || '';
    const videoPath = `server/uploads/${file instanceof File ? file.getPath() : ''}`;
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize - 1);

    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': file instanceof File ? file.getType() : ''
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });

    stream.pipe(res);
  };
}
