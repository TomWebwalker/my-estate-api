import { PaginatedType } from '../abstract';

export function toPagination<T>([rows, total]: [
  rows: T[],
  total: number,
]): PaginatedType<T> {
  return { rows, total };
}
