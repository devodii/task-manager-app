import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'account' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @OneToMany(() => Feedback, (feedback) => feedback.user, { nullable: true })
  feedbacks: Feedback[];

  @OneToOne(() => Workspace, (workspace) => workspace.owner, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'workspaceId' })
  ownedWorkspace: Workspace;

  @Column({ type: 'boolean', default: false })
  isAnonymous: boolean;
}
