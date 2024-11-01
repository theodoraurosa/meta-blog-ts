import { Comment, Prisma } from "@prisma/client";
import {
  PaginationInput,
  PaginationOutput,
} from "../../../utils/pagination.dto";

export type CommentPaginationInput = PaginationInput;
export type CommentPaginationOutput = PaginationOutput<Comment>;

export interface ICommentRepository {
  insert(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
  findById(id: string): Promise<Comment | null>;
  findByPostId(post_id: string): Promise<Comment[]>
  updade(data: Comment): Promise<Comment>;
  delete(id: string): Promise<void>;
}
