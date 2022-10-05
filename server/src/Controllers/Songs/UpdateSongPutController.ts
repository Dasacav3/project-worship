import { Request, Response } from 'express';
import UpdateSongAction from '../../Application/Songs/UpdateSongAction';

export default class UpdateSongPutController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, tone, type, lyrics } = req.body;

    const updatedSong = await new UpdateSongAction().execute(id, title, tone, type, lyrics);

    if (updatedSong instanceof Error) {
      return res.status(400).json({ error: updatedSong.message });
    }

    return res.status(200).json(updatedSong);
  }
}
