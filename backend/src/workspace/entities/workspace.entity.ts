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
import { WorkspaceMetadata } from '../workspace.interface';
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

  @Column({
    type: 'jsonb',
    default: {
      tags: [
        { name: 'Design', color: '#492F64' },
        { name: 'Development', color: '#28316A' },
        { name: 'Privacy', color: '#373737' },
      ],
    },
    nullable: true,
  })
  metadata: WorkspaceMetadata;
}
