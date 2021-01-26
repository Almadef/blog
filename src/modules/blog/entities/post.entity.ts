import {
  Entity,
  Column,
  JoinColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { EntityBase } from '../../../common/bases/entity.base';
import { CategoryEntity } from './category.entity';
import { TagEntity } from './tag.entity';

@Entity('post', { schema: 'public' })
export class PostEntity extends EntityBase {
  @Column('character varying', {
    name: 'title',
    nullable: false,
    unique: true,
    length: 50,
  })
  title: string;

  @Column('character varying', {
    name: 'preview',
    nullable: false,
    length: 700,
  })
  preview: string;

  @Column('text', { name: 'description', nullable: false })
  description: string;

  @Column('character varying', { name: 'image_mobile_preview', length: 200 })
  image_mobile_preview: string;

  @Column('character varying', {
    name: 'image_mobile_description',
    length: 200,
  })
  image_mobile_description: string;

  @Column('character varying', { name: 'image_site_preview', length: 200 })
  image_site_preview: string;

  @Column('character varying', { name: 'image_site_description', length: 200 })
  image_site_description: string;

  @Column('character varying', {
    name: 'meta_description',
    nullable: false,
    length: 100,
  })
  meta_description: string;

  @Column('character varying', {
    name: 'meta_keywords',
    nullable: false,
    length: 100,
  })
  meta_keywords: string;

  @Column('integer', { name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: CategoryEntity;

  @ManyToMany(() => TagEntity, { cascade: true })
  @JoinTable({
    name: 'tag_post',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: TagEntity[];
}
