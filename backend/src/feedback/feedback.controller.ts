import { Controller, Post, Headers, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  async submitFeedback(
    @Headers('SessionId') userId: string,
    @Body('message') message: string,
  ) {
    return await this.feedbackService.create(userId, message);
  }
}
