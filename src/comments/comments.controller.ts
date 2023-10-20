import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    createCommentDto['user'] = req?.user?.user;
    return this.commentsService.create(createCommentDto);
  }

  @Get(':post')
  findAll(@Param('post') post: string) {
    // ['user'] = req?.user?.user;

    return this.commentsService.findAll(post);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: any,
  ) {
    updateCommentDto['user'] = req?.user?.user;
    return this.commentsService.update(id, updateCommentDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const user = req?.user?.user;

    return this.commentsService.remove(id, user);
  }
}
