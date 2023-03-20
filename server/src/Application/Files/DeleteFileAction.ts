import File from '../../Domain/Entity/File/File';
import FileRepository from '../../Infrastructure/Repositories/Sqlite/FileRepository';
import { unlink } from 'fs';

export default class DeleteFileAction {
  public async execute(id: string): Promise<File | Error> {
    const fileRepository = new FileRepository();
    const file = await fileRepository.findOne(id);

    if (!file) {
      return new Error('File not found.');
    }

    await fileRepository.delete(id);

    const filePath = `server/uploads/${file instanceof File ? file.getPath() : ''}`;
    if (filePath) {
      unlink(filePath, err => {
        if (err) {
          return new Error('File not found.');
        }
      });
    }

    const thumbnailPath = file instanceof File ? file.getThumbnailPath() : '';
    if (thumbnailPath) {
      unlink(thumbnailPath, err => {
        if (err) {
          return new Error('File not found.');
        }
      });
    }
    return file;
  }
}
