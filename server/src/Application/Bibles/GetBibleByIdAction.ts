import fs from 'fs';
import readline from 'readline';
import Bible from '../../Domain/Entity/Bible/Bible';
import { BibleStructure } from '../../Domain/Entity/Bible/BibleStructure';
import BibleRepository from '../../Infrastructure/Repositories/Sqlite/BibleRepository';

export default class GetBibleByIdAction {
  public async execute(id: number, book: any, chapter: any): Promise<object | Error> {
    const bibleRepository = new BibleRepository();
    const bible = await bibleRepository.findOne(id);

    if (bible instanceof Error) {
      return new Error(`Bible with id ${id} not found`);
    }

    const BibleContent = await this.importBible(
      bible instanceof Bible ? bible.getPath() : '',
      parseInt(book),
      parseInt(chapter)
    );

    return BibleContent;
  }

  public async importBible(path: string, book: number, chapter: number): Promise<object[]> {
    const biblePath = `server/bibles/${path}`;
    const fileStream = fs.createReadStream(biblePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let content: any[] = [];

    for await (const line of rl) {
      let structure = line.split('|');
      content.push({
        book: parseInt(structure[0]),
        chapter: parseInt(structure[1]),
        verse: parseInt(structure[2]),
        text: structure[3]
      });
    }

    return content.filter(item => {
      return item.book === book && item.chapter === chapter;
    });
  }
}
