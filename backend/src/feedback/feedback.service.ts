import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(@InjectRepository(Feedback) private repo: Repository<Feedback>) {}

  async create(userId: string, message: string) {
    const task = this.repo.create({ message, user: { id: userId } });

    return await this.repo.save(task);
  }
}
