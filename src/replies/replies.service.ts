import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reply } from './schemas/replies.schema';
import { Model } from 'mongoose';

@Injectable()
export class RepliesService {
  constructor(@InjectModel(Reply.name) private replyModel: Model<Reply>) {}
  async create(createReplyDto: CreateReplyDto) {
    const newReply = await this.replyModel.create(createReplyDto);
    return {
      message: 'new reply created',
      reply: newReply,
    };
  }

  async findAll(comment) {
    console.log('comment', comment);
    const replies = await this.replyModel.find({ comment });
    return {
      message: 'all replies',
      replies: replies,
    };
  }

  async findOne(id: string) {
    const reply = await this.replyModel.findOne({ _id: id });
    return {
      message: 'reply found',
      reply: reply,
    };
    return `This action returns a #${id} reply`;
  }

  async update(id: string, updateReplyDto: UpdateReplyDto) {
    const { user, text } = updateReplyDto;
    console.log(text);
    console.log(user);
    const updatedReply = await this.replyModel.findOneAndUpdate(
      { _id: id, user },
      { text, updatedAt: Date.now() },
      { new: true },
    );
    console.log(updatedReply);
    return {
      message: 'reply updated',
      reply: updatedReply,
    };
    return `This action updates a #${id} reply`;
  }

  async remove(id: string, user: string) {
    const deletedReply = await this.replyModel.findOneAndDelete({
      _id: id,
      user,
    });
    return {
      message: 'reply deleted',
      reply: deletedReply,
    };
    return `This action removes a #${id} reply`;
  }
}
