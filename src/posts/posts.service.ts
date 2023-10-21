import { Injectable, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { Notification } from 'src/notifications/schemas/notification.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = await this.postModel.create(createPostDto);
    const newNotification = await this.notificationModel.create({
      text: 'new post created',
      notificationFor: newPost._id,
    });
    return {
      message: 'new post created',
      post: newPost,
    };
  }

  async findAll() {
    const allPosts = await this.postModel.aggregate([
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
        $project: {
          'user.password': 0,
        },
      },
    ]);
    return {
      message: 'all posts',
      posts: allPosts,
    };
    return `This action returns all posts`;
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id);
    return {
      message: 'post found',
      post: post,
    };

    // return `This action returns a #${id} post`;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { field, value } = updatePostDto;
    const updatedPost = await this.postModel.findOneAndUpdate(
      {
        _id: id,
        user: updatePostDto['user'],
      },
      { $set: { [field]: value } },
      {
        new: true,
      },
    );
    return {
      message: 'post updated',
      post: updatedPost,
    };
    // return `This action updates a #${id} post`;
  }

  async remove(id: string, user: string) {
    const removedPost = await this.postModel.findOneAndDelete({
      _id: id,
      user: user,
    });
    return {
      message: 'post deleted',
      post: removedPost,
    };
    // return `This action removes a #${id} post`;
  }
}
