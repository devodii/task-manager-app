import { Profile } from 'src/profile/entities/profile.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Workspace {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => Task, (task) => task.workspace, { nullable: true })
  tasks: Task[];

  @OneToOne(() => User, (user) => user.ownedWorkspace, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToMany(() => Profile, (profile) => profile.workspaces)
  members: Profile[];
}
