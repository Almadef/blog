import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../../common/bases/entity.base';

@Entity('category', { schema: 'public' })
export class CategoryEntity extends EntityBase {
  @Column('character varying', { name: 'title', unique: true, length: 50 })
  title: string;
}
