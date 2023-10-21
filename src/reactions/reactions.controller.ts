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
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createReactionDto: CreateReactionDto, @Req() req: any) {
    const user = req?.user?.user;
    createReactionDto['user'] = user;
    return this.reactionsService.create(createReactionDto);
  }

  @Get(':post')
  findAll(@Param('post') post: string) {
    return this.reactionsService.findAll(post);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactionsService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateReactionDto: UpdateReactionDto,
  // ) {
  //   return this.reactionsService.update(+id, updateReactionDto);
  // }

  @UseGuards(JwtGuard)
  @Delete(':post')
  remove(@Param('post') post: string, @Req() req: any) {
    const user = req?.user?.user;
    return this.reactionsService.remove(post, user);
    // return this.reactionsService.remove(id);
  }
}
