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

  public async find(page: number, entries: number, search: string): Promise<object> {
    const db = await openDb();
    let total: any;
    let pages: number = 0;
    let songs: any;

    if (search.length > 0) {
      total = await db.get('SELECT COUNT(*) as total FROM songs WHERE title LIKE ? OR lyrics LIKE ?', [`%${search}%`, `%${search}%`]);
      pages = Math.ceil(total.total / entries);
      const offset = (page - 1) * entries;
      songs = await db.all('SELECT * FROM songs WHERE title LIKE ? OR lyrics LIKE ? ORDER BY title LIMIT ? OFFSET ?', [`%${search}%`, `%${search}%`, entries, offset]);
    } else {
      total = await db.get('SELECT COUNT(*) as total FROM songs');
      pages = Math.ceil(total.total / entries);
      const offset = (page - 1) * entries;
      songs = await db.all('SELECT * FROM songs ORDER BY title LIMIT ? OFFSET ?', [entries, offset]);
    }

    return {
      pagination: {
        count: total.total,
        pages: pages,
        current: page,
        next: page + 1 <= pages ? page + 1 : null,
        prev: page - 1 > 0 ? page - 1 : null,
        entries: entries
      },
      data: songs.map((song: any) => {
        return new Song(
          song.id,
          song.title,
          song.tone,
          song.type,
          song.lyrics,
          new Date(song.created_at),
          new Date(song.updated_at)
        );
      })
    };
  }

  public async findOne(id: string): Promise<Song | Error> {
    const db = await openDb();
    const song = await db.get('SELECT * FROM songs WHERE id = ?', [id]);

    if (!song) {
      return new Error('Song not found');
    }

    return new Song(
      song.id,
      song.title,
      song.tone,
      song.type,
      song.lyrics,
      new Date(song.created_at),
      new Date(song.updated_at)
    );
  }

  public async update(song: Song): Promise<void> {
    const db = await openDb();
    await db.run(
      'UPDATE songs SET title = ?, tone = ?, type = ?, lyrics = ?, updated_at = ? WHERE id = ?',
      [song.getTitle(), song.getTone(), song.getType(), song.getLyrics(), song.getUpdatedAt(), song.getId()]
    );
  }

  public async delete(id: string): Promise<void> {
    const db = await openDb();
    await db.run('DELETE FROM songs WHERE id = ?', [id]);
  }
}
