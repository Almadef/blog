import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../../common/bases/entity.base';

@Entity('tag', { schema: 'public' })
export class TagEntity extends EntityBase {
  @Column('character varying', { name: 'title', unique: true, length: 50 })
  title: string;
}
