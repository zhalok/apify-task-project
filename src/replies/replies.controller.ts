import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createReplyDto: CreateReplyDto, @Req() req: any) {
    createReplyDto['user'] = req?.user?.user;
    return this.repliesService.create(createReplyDto);
  }

  @Get('all/:comment')
  findAll(@Param('comment') comment: string) {
    return this.repliesService.findAll(comment);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repliesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReplyDto: UpdateReplyDto,
    @Req() req: any,
  ) {
    const user = req?.user?.user;
    updateReplyDto['user'] = user;
    return this.repliesService.update(id, updateReplyDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const user = req?.user?.user;
    return this.repliesService.remove(id, user);
  }
}
