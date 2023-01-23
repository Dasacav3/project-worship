import { Request, Response } from 'express';
import CreateSongAction from '../../Application/Songs/CreateSongAction';
import { generateUuid } from '../../Infrastructure/Utils/Utils';

export default class CreateSongPostController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const id = generateUuid();
    const { title, tone, type, lyrics } = req.body;

    const createdSong = await new CreateSongAction().execute(id, title, tone, type, lyrics);

    if (createdSong instanceof Error) {
      return res.status(400).json({ error: createdSong.message });
    }

    return res.status(201).json(createdSong);
  }
}
