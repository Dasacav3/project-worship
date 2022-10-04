import File from '../../Entity/File/File';

export default interface IFileRepository {
  save(file: File): Promise<void>;

  find(page: number, entries: number): Promise<object>;

  findOne(id: string): Promise<File | Error>;

  update(file: File): Promise<void>;
}
