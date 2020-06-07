import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Opinion from '@modules/opinions/infra/typeorm/entities/Opinion';
import PostImage from './PostImage';
import Category from './Category';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  category_id: string | null;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => PostImage, postImage => postImage.post, {
    cascade: true,
    eager: true,
  })
  images: PostImage[];

  @OneToMany(() => Opinion, opinion => opinion.post, {
    cascade: true,
  })
  opinions: Opinion[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;
