import IFileDTO from '../dtos/IFileDTO';

export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  deleteTmpFiles(files: IFileDTO[]): Promise<void>;
  saveFiles(files: IFileDTO[]): Promise<void>;
  deleteFiles(files: IFileDTO[]): Promise<void>;
}
