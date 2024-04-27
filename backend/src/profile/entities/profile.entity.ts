import { User } from 'src/user/entities/user.entity';
import { WorkspaceMember } from 'src/workspace/entities/workspace-member.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
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
   * A profile can belong to multiple workspaces.
   */
  @OneToMany(() => WorkspaceMember, (member) => member.workspace)
  workspaces: Workspace[];
}
