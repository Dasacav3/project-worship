export default class File {
  private id: string;
  private name: string;
  private type: string;
  private size: number;
  private path: string;
  private thumbnailPath: string;
  private category: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    name: string,
    type: string,
    size: number,
    path: string,
    thumbnailPath: string,
    category: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.size = size;
    this.path = path;
    this.thumbnailPath = thumbnailPath;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): string {
    return this.type;
  }

  public getSize(): number {
    return this.size;
  }

  public getPath(): string {
    return this.path;
  }

  public getThumbnailPath(): string {
    return this.thumbnailPath;
  }

  public getCategory(): number {
    return this.category;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setCategory(category: number): void {
    this.category = category;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
