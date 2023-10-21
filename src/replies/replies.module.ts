import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { Reply, ReplySchema } from './schemas/replies.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from 'src/notifications/schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reply.name, schema: ReplySchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [RepliesController],
  providers: [RepliesService],
})
export class RepliesModule {}
