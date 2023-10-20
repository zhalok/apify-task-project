import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../common/types/types';


export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user ;
    
    return user.user;
  },
);