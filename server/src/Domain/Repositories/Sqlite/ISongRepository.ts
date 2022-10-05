import Song from '../../Entity/Song/Song';

export default interface ISongRepository {
  save(song: Song): Promise<void>;

  find(page: number, entries: number): Promise<object>;
}
