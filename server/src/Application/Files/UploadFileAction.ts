import { FileFactory } from '../../Domain/Entity/File/FileFactory';
import FileRepository from '../../Infrastructure/Repositories/Sqlite/FileRepository';
import File from '../../Domain/Entity/File/File';

export default class UploadFileAction {
  public execute(file: object, uuid: string, category: number): File {
    const fileObject = this.createFile(file, uuid, category);
    new FileRepository().save(fileObject);
    return fileObject;
  }

  private createFile(file: any, uuid: string, category: number): File {
    return new FileFactory().createFile(
      uuid,
      file.originalname || '',
      file.mimetype || '',
      file.size || 0,
      file.filename || '',
      category,
      new Date(),
      new Date()
    );
  }
}
