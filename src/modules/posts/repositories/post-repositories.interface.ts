import { Post, Prisma } from "@prisma/client";
import {
  PaginationInput,
  PaginationOutput,
} from "../../../utils/pagination.dto";

export type PostPaginationInput = PaginationInput;
export type PostPaginationOutput = PaginationOutput<Post>;

export interface IPostRepository {
  insert(data: Prisma.PostCreateInput): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findAll(params: PostPaginationInput): Promise<PostPaginationOutput>;
  update(data: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
