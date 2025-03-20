import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentsService, CommentsResolver],
  exports: [SequelizeModule],
})
export class CommentsModule {}
