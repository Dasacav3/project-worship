import Song from "../../Domain/Entity/Song/Song";
import SongRepository from "../../Infrastructure/Repositories/Sqlite/SongRepository";

export default class DeleteSongAction {
  public async execute(id: string): Promise<Song | Error> {
    const songRepository = new SongRepository();

    const song = await songRepository.findOne(id);

    if (!song) {
      return new Error("Song not found.");
    }

    await songRepository.delete(id);

    return song;
  }
}
