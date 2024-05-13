import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Task } from 'src/task/entities/task.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'account' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToOne(() => Profile)
  profile: Profile;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Task, (task) => task.user, { nullable: true })
  feedbacks: Feedback[];

  @OneToOne(() => Workspace, (workspace) => workspace.owner, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'workspaceId' })
  ownedWorkspace: Workspace;
}
