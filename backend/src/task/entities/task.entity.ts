import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskStatus } from '../task.interface';
import { TaskAssignee } from './task-assignee.entity';

@Entity()
export class Task {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', default: 'todo' })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  workspace: Workspace | null;

  @OneToOne(() => TaskAssignee, (assignee) => assignee.task, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  assignee: TaskAssignee;
}
