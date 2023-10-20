import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction } from './schemas/reaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectModel(Reaction.name) private reactionModel: Model<Reaction>,
  ) {}

  async create(createReactionDto: CreateReactionDto) {
    const reaction = await this.reactionModel.create(createReactionDto);
    return {
      message: 'new reaction created',
      reaction: reaction,
    };
    return 'This action adds a new reaction';
  }

  async findAll(post: string) {
    const reactions = await this.reactionModel.find({ reactionFor: post });
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

  async remove(id: string, user: string) {
    const removedReaction = await this.reactionModel.findOneAndDelete({
      _id: id,
      user: user,
    });
    return {
      message: 'reaction deleted',
      reaction: removedReaction,
    };
    return `This action removes a #${id} reaction`;
  }
}
