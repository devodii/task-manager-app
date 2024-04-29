import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUserId } from 'src/decorators/current-user.decorator';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  async submitFeedback(
    @CurrentUserId() userId: string,
    @Body('message') message: string,
  ) {
    return await this.feedbackService.create(userId, message);
  }
}
