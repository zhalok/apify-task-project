import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { Notification } from 'src/notifications/schemas/notification.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentModel.create(createCommentDto);

    const newNotification = await this.notificationModel.create({
      title: 'A comment is added to your post',
      text: createCommentDto['text'],
      notificationFor: createCommentDto['post'],
    });
    return {
      message: 'new comment created',
      comment: newComment,
    };
  }

  async findAll(post: string) {
    const comments = await this.commentModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $match: {
          post: new mongoose.Types.ObjectId(post),
        },
      },
      {
        $project: {
          // 'user._id': 1,
          'user.password': 0,
          // _id: 1,
        },
      },
    ]);
    return {
      message: 'all comments',
      length: comments.length,
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
