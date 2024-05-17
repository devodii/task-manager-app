import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class TaskAssignee {
  @PrimaryColumn()
  id: string;

  @Column()
  profileName: string;

  @Column()
  profileImg: string;

  @OneToOne(() => Task, (task) => task.assignee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
