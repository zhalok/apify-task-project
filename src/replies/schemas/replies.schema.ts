import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from 'src/comments/schemas/comment.schema';
import { User } from 'src/users/schemas/user.schema';

export type ReplyDocument = Reply & Document;

@Schema()
export class Reply {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  })
  comment: Comment;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
