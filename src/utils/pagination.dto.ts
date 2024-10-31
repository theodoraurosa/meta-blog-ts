/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaginationInput {
  filter?: string
  sort?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface PaginationOutput<T = any> {
  items: T[]
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}
