import File from '../../Entity/File/File';

export default interface IDatabaseRepository {
  save(file: File): Promise<void>;
}
