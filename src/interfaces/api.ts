export interface IParams {
  url: string
  payload?: any
}

export interface IApiResponse<T> {
  success: boolean
  message: string
  data: T
  pagination?: {
    totalCount: number
    page: number
    limit: number
    totalPages: number
  }
}
