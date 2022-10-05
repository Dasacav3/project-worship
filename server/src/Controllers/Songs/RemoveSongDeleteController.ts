import { Request, Response } from 'express';
import DeleteSongAction from '../../Application/Songs/DeleteSongAction';

export default class RemoveSongDeleteController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const removedSong = await new DeleteSongAction().execute(id);

    if (removedSong instanceof Error) {
      return res.status(400).json({ error: removedSong.message });
    }

    return res.status(200).json(removedSong);
  }
}
