import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryColumn()
  id: string;

  @Column()
  imageUrl: string;

  @Index()
  @Column({ type: 'varchar' })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  /**
   * A user with profile can belong to multiple workspaces.
   */
  @ManyToMany(() => Workspace, (workspace) => workspace.members)
  workspaces: Workspace[];
}
