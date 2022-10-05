import Bible from '../../Entity/Bible/Bible';

export default interface IBibleRepository {
  find(page: number, entries: number): Promise<object>;

  findOne(id: number): Promise<Bible | Error>;
}
