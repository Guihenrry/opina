import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import storageConfig from '@config/storage';

import Post from './Post';

@Entity('post_images')
class PostImage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  post_id: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  filename: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image' })
  getImageUrl(): string {
    if (storageConfig.driver === 's3') {
      return `https://${storageConfig.awsS3.bucketName}.s3.amazonaws.com/${this.filename}`;
    }

    return `${process.env.APP_API_URL}/files/${this.filename}`;
  }
}

export default PostImage;
