import Song from '../../Domain/Entity/Song/Song';
import SongFactory from '../../Domain/Entity/Song/SongFactory';
import SongRepository from '../../Infrastructure/Repositories/Sqlite/SongRepository';

export default class CreateSongAction {
  public async execute(
    id: string,
    title: string,
    tone: string,
    type: number,
    lyrics: string
  ): Promise<object | Error> {
    const song = this.createSong(id, title, tone, type, lyrics);
    new SongRepository().save(song);

    return song;
  }

  private createSong(id: string, title: string, tone: string, type: number, lyrics: string): Song {
    return new SongFactory().createSong(id, title, tone, type, lyrics);
  }
}
