import { Request, Response } from 'express';
import GetSongByIdAction from '../../Application/Songs/GetSongByIdAction';

export default class GetSongByIdGetController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const song = await new GetSongByIdAction().execute(id);

    if (song instanceof Error) {
      return res.status(404).json({
        message: song.message
      });
    }

    return res.status(200).json(song);
  }
}
