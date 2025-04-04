import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { WaitingListEntry } from '../../waiting-list-entry/entities/waiting-list-entry.entity';

@Entity()
export class WaitingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', unique: true })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WaitingListEntry, entry => entry.waitingList, { cascade: true })
  entries: WaitingListEntry[];
} 