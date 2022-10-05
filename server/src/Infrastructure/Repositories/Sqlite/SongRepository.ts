import { openDb } from '../../../db';
import Song from '../../../Domain/Entity/Song/Song';
import ISongRepository from '../../../Domain/Repositories/Sqlite/ISongRepository';

export default class SongRepository implements ISongRepository {
  public async save(song: Song): Promise<void> {
    const db = await openDb();
    await db.run(
      'INSERT INTO songs (id, title, tone, type, lyrics, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        song.getId(),
        song.getTitle(),
        song.getTone(),
        song.getType(),
        song.getLyrics(),
        song.getCreatedAt(),
        song.getUpdatedAt()
      ]
    );
  }
}
