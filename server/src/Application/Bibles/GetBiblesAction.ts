import BibleRepository from "../../Infrastructure/Repositories/Sqlite/BibleRepository";

export default class GetBiblesAction {
  public async execute(page: number, entries: number): Promise<object> {
    const bibleRepository = new BibleRepository();
    const bibles = await bibleRepository.find(page, entries);

    return bibles;
  }
}
