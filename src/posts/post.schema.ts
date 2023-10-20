import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { User } from 'src/users/user.schema';

export type UserDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  text: string;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
