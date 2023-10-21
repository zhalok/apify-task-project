import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { abort } from 'process';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './schemas/notification.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll(user: any) {
    // console.log(post);
    const notifications = await this.notificationModel.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: 'notificationFor',
          foreignField: '_id',
          as: 'post',
        },
      },
      {
        $unwind: {
          path: '$post',
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: 'comments',
          localField: 'post._id',
          foreignField: 'post',
          as: 'comment',
        },
      },
      {
        $unwind: {
          path: '$comment',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comment.user',
          foreignField: '_id',
          as: 'commenter',
        },
      },
      {
        $unwind: {
          path: '$commenter',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'post.user': new mongoose.Types.ObjectId(user),
        },
      },

      {
        $project: {
          'post.image': 0,
          'commenter.password': 0,

          // title: 1,
          // text: 1,
        },
      },
    ]);
    return {
      message: 'all notifications for post ',
      notifications: notifications,
    };
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
