import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { RepliesModule } from './replies/replies.module';
import { ReactionsModule } from './reactions/reactions.module';
import { EmailModule } from './email/email.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,

      signOptions: { expiresIn: '30d' },
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jdwhakv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    RepliesModule,
    ReactionsModule,
    EmailModule,
    NotificationsModule,
  ],
})
export class AppModule {}
