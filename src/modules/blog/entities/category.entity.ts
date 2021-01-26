import { Entity, Column, OneToMany } from 'typeorm';
import { EntityBase } from '../../../common/bases/entity.base';
import { PostEntity } from './post.entity';

@Entity('category', { schema: 'public' })
export class CategoryEntity extends EntityBase {
  @Column('character varying', {
    name: 'title',
    nullable: false,
    unique: true,
    length: 50,
  })
  title: string;

  @OneToMany(() => PostEntity, (post) => post.category, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  posts: PostEntity[];
}
