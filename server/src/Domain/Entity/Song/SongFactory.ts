import Song from './Song';

export default class SongFactory {
  public createSong(id: string, title: string, tone: string, type: number, lyrics: string): Song {
    return new Song(id, title, tone, type, lyrics, new Date(), new Date());
  }
}
