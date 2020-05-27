import IStorageProvider from '../models/IStorageProvider';
import IFileDTO from '../dtos/IFileDTO';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }

  public async deleteTmpFiles(files: IFileDTO[]): Promise<void> {
    files.forEach(file => {
      const findIndex = this.storage.findIndex(
        storageFile => storageFile === file.filename,
      );

      this.storage.splice(findIndex, 1);
    });
  }

  public async saveFiles(files: IFileDTO[]): Promise<void> {
    const filesArray = files.map(file => file.filename);
    this.storage = [...this.storage, ...filesArray];
  }

  public async deleteFiles(files: IFileDTO[]): Promise<void> {
    files.forEach(file => {
      const findIndex = this.storage.findIndex(
        storageFile => storageFile === file.filename,
      );

      this.storage.splice(findIndex, 1);
    });
  }
}

export default FakeStorageProvider;
