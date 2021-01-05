import {
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { DateHelper } from '../helpers/date.helper';

export abstract class EntityBase {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'created_at' })
  createdAt: number;

  @Column('integer', { name: 'updated_at' })
  updatedAt: number;

  @BeforeInsert()
  setTimestamp() {
    this.createdAt = DateHelper.getNowUnixTime();
    this.updatedAt = DateHelper.getNowUnixTime();
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = DateHelper.getNowUnixTime();
  }
}
