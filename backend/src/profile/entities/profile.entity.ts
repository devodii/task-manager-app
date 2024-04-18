import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryColumn()
  id: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'varchar' })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User)
  user: User;
}
