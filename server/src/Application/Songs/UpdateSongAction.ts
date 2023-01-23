import SongRepository from '../../Infrastructure/Repositories/Sqlite/SongRepository';
import Song from '../../Domain/Entity/Song/Song';

export default class UpdateSongAction {
  public async execute(id: string, title: string, tone: string, type: number, lyrics: string): Promise<Song | Error> {
    const song = await new SongRepository().findOne(id);

    if (song instanceof Error) {
      return new Error('Song not found');
    }

    song.setTitle(title);
    song.setTone(tone);
    song.setType(type);
    song.setLyrics(lyrics);
    song.setUpdatedAt(new Date());

    await new SongRepository().update(song);

    return song;
  }
}
