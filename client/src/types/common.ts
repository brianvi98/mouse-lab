export type Paging = {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type PagedData<T> = {
  items: T[];
  paging: Paging;
};

export type ApiEnvelope<T> = {
  data: T | null;
  error: string | null;
  path: string;
  timestamp: string; // Java Instant
};
