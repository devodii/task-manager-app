import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskAssignee } from './task-assignee.entity';
import { TaskStatus } from '../task.interface';

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

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  workspace: Workspace | null;

  @OneToOne(() => TaskAssignee, (assignee) => assignee.task)
  @JoinColumn()
  assignee: TaskAssignee;
}
