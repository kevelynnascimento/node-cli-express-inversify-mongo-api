import { Sort, SortDirection } from "mongodb";

export enum OrderDirectionEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationResponse<T> {
  rows: T[];
  count: number;
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: SortDirection;
}

export class PaginationHelper {
  public static get(paginationRequest: PaginationRequest): { skip: number, pageSize: number, sortColumn: string, sortDirection: SortDirection } {
    const pagination = {
      skip: +paginationRequest.page * +paginationRequest.pageSize,
      pageSize: +paginationRequest.pageSize,
      sortColumn: paginationRequest.sortColumn,
      sortDirection: paginationRequest.sortDirection
    };

    return pagination;
  };
}