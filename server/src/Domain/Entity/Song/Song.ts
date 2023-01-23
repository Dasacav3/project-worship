export default class Song {
  public id: string;
  public title: string;
  public tone: string;
  public type: number;
  public lyrics: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: string,
    title: string,
    tone: string,
    type: number,
    lyrics: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.tone = tone;
    this.type = type;
    this.lyrics = lyrics;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getTone(): string {
    return this.tone;
  }

  public getType(): number {
    return this.type;
  }

  public getLyrics(): string {
    return this.lyrics;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setTone(tone: string): void {
    this.tone = tone;
  }

  public setType(type: number): void {
    this.type = type;
  }

  public setLyrics(lyrics: string): void {
    this.lyrics = lyrics;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
