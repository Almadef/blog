import { Entity, Column, ManyToMany } from 'typeorm';
import { EntityBase } from '../../../common/bases/entity.base';
import { PostEntity } from './post.entity';

@Entity('tag', { schema: 'public' })
export class TagEntity extends EntityBase {
  @Column('character varying', {
    name: 'title',
    nullable: false,
    unique: true,
    length: 50,
  })
  title: string;

  @ManyToMany(() => PostEntity, { cascade: true })
  posts: PostEntity[];
}
