import SongRepository from '../../Infrastructure/Repositories/Sqlite/SongRepository';

export default class GetSongByIdAction {
  public async execute(id: string): Promise<object | Error> {
    const songRepository = new SongRepository();
    const song = await songRepository.findOne(id);

    return song;
  }
}
