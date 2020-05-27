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
    return `${process.env.APP_API_URL}/files/${this.filename}`;
  }
}

export default PostImage;
