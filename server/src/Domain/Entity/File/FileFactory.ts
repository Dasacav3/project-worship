import File from "./File";

export class FileFactory {
    public createFile(id: string, name: string, type: string, size: number, path: string, createdAt: Date, updatedAt: Date): File {
        return new File(id, name, type, size, path, createdAt, updatedAt);
    }
}