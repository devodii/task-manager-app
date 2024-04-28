import { Profile } from 'src/profile/entities/profile.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Workspace } from './workspace.entity';

/**
 * A link between profiles and workspaces
 */
@Entity()
export class WorkspaceMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.members)
  workspace: Workspace;

  @ManyToOne(() => Profile, (profile) => profile.workspaces)
  profile: Profile;
}