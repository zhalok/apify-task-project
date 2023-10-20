import { Injectable, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = await this.postModel.create(createPostDto);
    return {
      message: 'new post created',
      post: newPost,
    };
  }

  async findAll() {
    const allPosts = await this.postModel.find();
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
