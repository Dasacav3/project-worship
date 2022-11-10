interface IFile {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  category: number;
  createdAt: Date;
  updatedAt: Date;
}

export default IFile;
