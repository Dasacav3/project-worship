import { BibleStructure } from '../../Domain/Entity/Bible/BibleStructure';

export default class GetBibleStructureAction {
  public async execute(): Promise<object> {
    return BibleStructure;
  }
}
