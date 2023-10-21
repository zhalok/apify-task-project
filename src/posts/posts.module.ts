import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { NotificationsModule } from 'src/notifications/notifications.module';
import {
  Notification,
  NotificationSchema,
} from 'src/notifications/schemas/notification.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
})
export class PostsModule {}
