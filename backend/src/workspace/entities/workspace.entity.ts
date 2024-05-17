import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { WorkspaceMember } from './workspace-member.entity';

@Entity()
export class Workspace {
  @PrimaryColumn()
  id: string;

  @Index()
  @Column({ unique: true, nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => Task, (task) => task.workspace, { nullable: true })
  tasks: Task[];

  @OneToOne(() => User, (user) => user.ownedWorkspace, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => WorkspaceMember, (member) => member.workspace)
  members: WorkspaceMember[];
}
