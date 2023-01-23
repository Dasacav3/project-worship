export default class Bible {
  private id: number;
  private name: string;
  private description: string;
  private path: string;

  constructor(id: number, name: string, description: string, path: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.path = path;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPath(): string {
    return this.path;
  }
}
