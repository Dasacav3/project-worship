import SongRepository from "../../Infrastructure/Repositories/Sqlite/SongRepository";

export default class GetSongsAction {
  public async execute(page: number, entries: number): Promise<object | Error> {
    const songRepository = new SongRepository();
    const songs = await songRepository.find(page, entries);

    return songs;
  }
}
