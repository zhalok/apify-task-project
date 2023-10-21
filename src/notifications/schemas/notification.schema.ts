import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { Reply } from 'src/replies/schemas/replies.schema';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  //   @Prop()
  //   title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  notificationFor: Post;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
