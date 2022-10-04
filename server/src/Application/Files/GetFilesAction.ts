import FileRepository from '../../Infrastructure/Repositories/Sqlite/FileRepository';

export default class GetFilesAction {
  public async execute(page: number, entries: number): Promise<object> {
    const fileRepository = new FileRepository();
    const files = await fileRepository.find(page, entries);

    return files;
  }
}
