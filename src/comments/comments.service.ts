import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentModel.create(createCommentDto);

    return {
      message: 'new comment created',
      comment: newComment,
    };
  }

  async findAll(post: string) {
    const comments = await this.commentModel.find({ post });
    return {
      message: 'all comments',
      comments: comments,
    };
  }

  async findOne(id: string) {
    const comment = await this.commentModel.findOne({ _id: id });
    return {
      message: 'comment found',
      comment: comment,
    };
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const updatedComment = await this.commentModel.findOneAndUpdate(
      {
        _id: id,
        user: updateCommentDto['user'],
      },
      {
        text: updateCommentDto['text'],
        updatedAt: Date.now(),
      },
      {
        new: true,
      },
    );
    return {
      message: 'comment updated',
      comment: updatedComment,
    };
  }

  async remove(id: string, user: string) {
    const removedComment = await this.commentModel.findOneAndDelete({
      _id: id,
      user: user,
    });
    return {
      message: 'comment deleted',
      comment: removedComment,
    };
  }
}
