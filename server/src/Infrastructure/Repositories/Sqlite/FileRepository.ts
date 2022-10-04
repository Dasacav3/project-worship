import IDatabaseRepository from '../../../Domain/Repositories/Database/IDatabaseRepository';
import { openDb } from '../../../db';
import File from '../../../Domain/Entity/File/File';

export default class FileRepository implements IDatabaseRepository {
  constructor() {}

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
}
