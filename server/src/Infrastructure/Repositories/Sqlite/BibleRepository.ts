import Bible from "../../../Domain/Entity/Bible/Bible";
import { openDb } from '../../../db';
import IBibleRepository from "../../../Domain/Repositories/Sqlite/IBibleRepository";

export default class BibleRepository implements IBibleRepository {
  public async find(page: number, entries: number): Promise<object> {
    const db = await openDb();
    const total = await db.get('SELECT COUNT(*) as total FROM bibles');
    const pages = Math.ceil(total.total / entries);
    const offset = (page - 1) * entries;
    const bibles = await db.all('SELECT * FROM bibles LIMIT ?, ?', [offset, entries]);

    return {
      pagination: {
        count: total.total,
        pages: pages,
        current: page,
        next: page + 1 <= pages ? page + 1 : null,
        prev: page - 1 > 0 ? page - 1 : null,
        entries: entries
      },
      data: bibles.map((bible: any) => {
        return new Bible(
          bible.id,
          bible.name,
          bible.description,
          bible.path
        );
      }
    )};
  }

  public async findOne(id: number): Promise<Bible | Error> {
    const db = await openDb();
    const bible = await db.get('SELECT * FROM bibles WHERE id = ?', [id]);

    if (!bible) {
      return Error('Bible not found');
    }

    return new Bible(
      bible.id,
      bible.name,
      bible.description,
      bible.path
    );
  }
}
