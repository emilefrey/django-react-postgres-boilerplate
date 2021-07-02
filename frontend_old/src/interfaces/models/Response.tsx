export default interface PageResponse<T> {
  count: number,
  next: string,
  previous: string,
  results: T[]
}

export interface Response<T> {
  data: T,
  status: number,
  statusText: string,
  config: object
};