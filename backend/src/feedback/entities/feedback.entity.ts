import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'text' })
  message: string;

  @ManyToOne(() => User, (user) => user.feedbacks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User;
}
