import fs from 'fs';
import path from 'path';
import storageConfig from '@config/storage';
import IStorageProvider from '../models/IStorageProvider';
import IFileDTO from '../dtos/IFileDTO';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const { tmpFolder, uploadsFolder } = storageConfig;

    await fs.promises.rename(
      path.resolve(tmpFolder, file),
      path.resolve(uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(storageConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async deleteTmpFiles(files: IFileDTO[]): Promise<void> {
    const { tmpFolder } = storageConfig;

    await Promise.all(
      files.map(file =>
        fs.promises.unlink(path.resolve(tmpFolder, file.filename)),
      ),
    );
  }

  public async saveFiles(files: IFileDTO[]): Promise<void> {
    const { tmpFolder, uploadsFolder } = storageConfig;

    Promise.all(
      files.map(file => {
        return fs.promises.rename(
          path.resolve(tmpFolder, file.filename),
          path.resolve(uploadsFolder, file.filename),
        );
      }),
    );
  }
}

export default DiskStorageProvider;
