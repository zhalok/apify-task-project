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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: any) {
    const user = req?.user?.user;
    return this.notificationsService.findAll(user);
  }

  @Get()
  findOne(@Param() id: string) {
    return this.notificationsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch('')
  update(@Req() req: any) {
    const user = req?.user?.user;
    // console.log(req?.user);
    return this.notificationsService.update(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
