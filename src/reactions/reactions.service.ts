import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction } from './schemas/reaction.schema';
import mongoose, { Model } from 'mongoose';
import { Notification } from 'src/notifications/schemas/notification.schema';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectModel(Reaction.name) private reactionModel: Model<Reaction>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async create(createReactionDto: CreateReactionDto) {
    const reaction = await this.reactionModel.create(createReactionDto);
    const notification = await this.notificationModel.create({
      notificationFor: createReactionDto?.reactionFor,
      text: 'New reaction was added',
      // notificationBy: createReactionDto?.user,
      // notificationType: 'reaction',
    });
    return {
      message: 'new reaction created',
      reaction: reaction,
    };
    return 'This action adds a new reaction';
  }

  async findAll(post: string) {
    const reactions = await this.reactionModel.aggregate([
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
          reactionFor: new mongoose.Types.ObjectId(post),
        },
      },
      {
        $project: {
          'user.password': 0,
        },
      },
    ]);
    return {
      message: 'all reactions',
      reactions: reactions,
    };
    return `This action returns all reactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reaction`;
  }

  update(id: number, updateReactionDto: UpdateReactionDto) {
    return `This action updates a #${id} reaction`;
  }

  async remove(post: string, user: string) {
    const removedReaction = await this.reactionModel.findOneAndDelete({
      // _id: id,
      reactionFor: post,
      user: user,
    });
    return {
      message: 'reaction deleted',
      reaction: removedReaction,
    };
    // return `This action removes a #${id} reaction`;
  }
}
