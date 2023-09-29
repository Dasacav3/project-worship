import { Request, Response } from 'express';
import { transpile } from 'typescript';
import CreateSongAction from '../../Application/Songs/CreateSongAction';
import { generateUuid } from '../../Infrastructure/Utils/Utils';

export default class ImportSongsPostController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    // Read file
    const fileContent = file?.buffer.toString('utf8');

    if (fileContent) {
      const songs = eval(fileContent + '; jscanciones');

      // For each song, and execute CreateSongAction
      for (const song of songs) {
        const uuid = generateUuid();
        try {
            const createSongAction = new CreateSongAction();
            createSongAction.execute(uuid, song.ti || '', song.tono || '', song.estilo || '', song.le || '');
        } catch (error) {
            console.error(`Error importing song ${song.ti}: ${error}`);
        }
      }
    }

    return res.status(201).json({ message: 'Imported songs' });
  }
}
