import File from '../../Domain/Entity/File/File';
import FileRepository from '../../Infrastructure/Repositories/Sqlite/FileRepository';

export default class GetFileByIdAction {
  public async execute(id: string): Promise<File | Error> {
    const fileRepository = new FileRepository();
    const file = await fileRepository.findOne(id);

    return file;
  }
}
