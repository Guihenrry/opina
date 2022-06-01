import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import storageConfig from '@config/storage';
import IStorageProvider from '../models/IStorageProvider';
import IFileDTO from '../dtos/IFileDTO';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({ region: storageConfig.awsS3.bucketRegion });
  }

  public async saveFile(file: string): Promise<string> {
    const filePath = path.resolve(storageConfig.tmpFolder, file);
    const ContentType = mime.getType(filePath);
    if (!ContentType) throw new Error('File not found');
    const fileContent = await fs.promises.readFile(filePath);

    await this.client
      .putObject({
        Bucket: storageConfig.awsS3.bucketName,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentDisposition: `inline; filename=${file}`,
        ContentType,
      })
      .promise();
    await fs.promises.unlink(filePath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: storageConfig.awsS3.bucketName,
        Key: file,
      })
      .promise();
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
    await Promise.all(files.map(file => this.saveFile(file.filename)));
  }

  public async deleteFiles(files: IFileDTO[]): Promise<void> {
    await Promise.all(files.map(file => this.deleteFile(file.filename)));
  }
}

export default DiskStorageProvider;
