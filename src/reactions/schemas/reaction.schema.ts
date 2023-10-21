import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { Reply } from 'src/replies/schemas/replies.schema';
import { User } from 'src/users/schemas/user.schema';

export type ReactionDocument = Reaction & Document;

@Schema()
export class Reaction {
  @Prop({ required: true, default: 'like' })
  type: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  reactionFor: Post | Comment | Reply;

  @Prop({ default: Date.now })
  createdAt: Date;

  //   @Prop({ default: 'like' })
  //   reactionType: string;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
