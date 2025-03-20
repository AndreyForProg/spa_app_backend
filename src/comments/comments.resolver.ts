import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';
import { CreateCommentInput } from './dto/create-comment.input';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards, UploadedFile } from '@nestjs/common';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentService: CommentsService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  async createComment(
    @Args('input') commentInput: CreateCommentInput,
  ): Promise<boolean> {
    const comment = await this.commentService.create(commentInput);
    if (comment) {
      return true;
    } else {
      throw new Error('Comment not created');
    }
  }

  @Query(() => [Comment])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  async getComments(): Promise<Comment[]> {
    const comments = await this.commentService.findAll();
    return comments;
  }
}
