import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends CreatePostDto {
  field: string;
  value: string;
  user: string;
}
