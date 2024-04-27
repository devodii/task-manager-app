import { Profile } from 'src/profile/entities/profile.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
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

  @ManyToMany(() => Profile, (profile) => profile.workspaces)
  members: Profile[];
}
