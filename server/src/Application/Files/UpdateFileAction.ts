import File from '../../Domain/Entity/File/File';
import FileRepository from '../../Infrastructure/Repositories/Sqlite/FileRepository';

export default class UpdateFileAction {
  public async execute(id: string, name: string, category: number): Promise<File | Error> {
    const file = await new FileRepository().findOne(id);

    if (file instanceof Error) {
      return Error('File not found');
    }

    file.setName(name);
    file.setCategory(category);
    file.setUpdatedAt(new Date());

    await new FileRepository().update(file);

    return file;
  }
}
