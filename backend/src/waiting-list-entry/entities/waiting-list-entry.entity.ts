import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WaitingList } from '../../waiting-list/entities/waiting-list.entity';

@Entity()
export class WaitingListEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  waitingListId: string;

  @Column()
  ownerName: string;

  @Column()
  puppyName: string;

  @Column()
  breed: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Column()
  position: number;

  @Column({ default: false })
  isServiced: boolean;

  @Column({ type: 'timestamp', nullable: true })
  servicedTime: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => WaitingList, waitingList => waitingList.entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'waitingListId' })
  waitingList: WaitingList;
} 