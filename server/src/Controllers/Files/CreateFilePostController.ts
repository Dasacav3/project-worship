import { Request, Response } from 'express';
import { generateUuid } from '../../Infrastructure/Utils/Utils';
import UploadFileAction from '../../Application/Files/UploadFileAction';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import sharp from 'sharp';
import childProcess from 'child_process';

export default class CreateFilePostController {
  public execute(req: Request, res: Response): Response {
    const { originalname, mimetype, size, filename } = req.file || {};

    let thumbnailPath = `server/uploads/thumbnails/${filename}`;

    const filePath = `server/uploads/${filename}`;

    // Create thumbnail from video
    if (mimetype?.includes('video')) {
      const ffmpegPath = ffmpegInstaller.path;
      const command = `${ffmpegPath} -ss ${5} -i ${filePath} -frames:v 1 -filter:v scale=w=480:h=-1 -f image2pipe -vcodec png -`;

      const ffmpegProcess = childProcess.spawn(command, [], {
        shell: true,
        stdio: ['ignore', 'pipe', 'ignore']
      });

      ffmpegProcess.on('error', err => {
        throw err;
      });

      const image = ffmpegProcess.stdout.pipe(sharp());

      try {
        const buffer = image.toBuffer();

        thumbnailPath = `server/uploads/thumbnails/${filename?.split('.')[0]}.png`;

        // We need to wait for the buffer to be ready
        buffer.then(data => {
          sharp(data)
            .resize(320, 240)
            .toFile(thumbnailPath, (err, info) => {
              if (err) {
                console.error(err);
              }
              console.info('Thumbnail created');
            });
        });
      } catch (err) {
        throw err;
      }
    }

    // Create thumbnail from image
    if (mimetype?.includes('image')) {
      sharp(filePath)
        .resize(320, 240)
        .toFile(`server/uploads/thumbnails/${filename}`, (err, info) => {
          if (err) {
            console.error(err);
          }
        });
    }

    // Save file to database
    const file = new UploadFileAction().execute(
      {
        originalname,
        mimetype,
        size,
        filename,
        thumbnailPath
      },
      generateUuid(),
      <number>req.body.category || 0
    );

    return res.json({ message: 'File saved', file });
  }
}
