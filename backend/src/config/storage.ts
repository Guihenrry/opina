import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IStorageConfig {
  driver: 'disk' | 's3';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  awsS3: {
    bucketName: string;
    bucketRegion: string;
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('HEX');
        const filename = `${fileHash}-${file.originalname}`;
        const filenameWitoutSpaces = filename.trim().replace(' ', '');

        callback(null, filenameWitoutSpaces);
      },
    }),
  },
  awsS3: {
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    bucketRegion: process.env.AWS_S3_BUCKET_REGION,
  },
} as IStorageConfig;
