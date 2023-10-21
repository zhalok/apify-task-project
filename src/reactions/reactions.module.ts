import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { Reaction, ReactionSchema } from './schemas/reaction.schema';
import {
  Notification,
  NotificationSchema,
} from 'src/notifications/schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reaction.name, schema: ReactionSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionsModule {}
