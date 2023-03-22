import File from './File';

export class FileFactory {
  public createFile(
    id: string,
    name: string,
    type: string,
    size: number,
    path: string,
    thumbnailPath: string,
    category: number,
    createdAt: Date,
    updatedAt: Date
  ): File {
    return new File(id, name, type, size, path, thumbnailPath, category, createdAt, updatedAt);
  }
}
