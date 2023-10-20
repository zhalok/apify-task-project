import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  text: string;

  @Prop()
  image: string;

  @Prop({ required: true, unique: true })
  user: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
