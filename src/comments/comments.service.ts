import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentInput } from './dto/create-comment.input';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async create(input: CreateCommentInput): Promise<Comment> {
    const cleanText = sanitizeHtml(input.text, {
      allowedTags: ['a', 'code', 'i', 'strong'],
      allowedAttributes: { a: ['href', 'title'] },
    });

    return this.commentModel.create({ ...input, text: cleanText } as any);
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel.findAll();
    return comments.map((comment) => comment);
  }
}
