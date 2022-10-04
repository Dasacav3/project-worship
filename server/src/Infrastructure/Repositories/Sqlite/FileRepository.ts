import IFileRepository from '../../../Domain/Repositories/Sqlite/IFileRepository';
import { openDb } from '../../../db';
import File from '../../../Domain/Entity/File/File';

export default class FileRepository implements IFileRepository {
  public async save(file: File): Promise<void> {
    const db = await openDb();
    await db.run(
      'INSERT INTO files (id, name, type, size, path, category, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        file.getId(),
        file.getName(),
        file.getType(),
        file.getSize(),
        file.getPath(),
        file.getCategory(),
        file.getCreatedAt(),
        file.getUpdatedAt()
      ]
    );
  }

  public async find(page: number, entries: number): Promise<object> {
    const db = await openDb();
    const total = await db.get('SELECT COUNT(*) as total FROM files');
    const pages = Math.ceil(total.total / entries);
    const offset = (page - 1) * entries;
    const files = await db.all('SELECT * FROM files LIMIT ?, ?', [offset, entries]);

    return {
      pagination: {
        count: total.total,
        pages: pages,
        current: page,
        next: page + 1 <= pages ? page + 1 : null,
        prev: page - 1 > 0 ? page - 1 : null,
        entries: entries
      },
      data: files.map((file: any) => {
        return new File(
          file.id,
          file.name,
          file.type,
          file.size,
          file.path,
          file.category,
          new Date(file.created_at),
          new Date(file.updated_at)
        );
      })
    };
  }

  public async findOne(id: string): Promise<File | Error> {
    const db = await openDb();
    const file = await db.get('SELECT * FROM files WHERE id = ?', [id]);

    if (!file) {
      return Error('File not found');
    }

    return new File(
      file.id,
      file.name,
      file.type,
      file.size,
      file.path,
      file.category,
      new Date(file.created_at),
      new Date(file.updated_at)
    );
  }
}
