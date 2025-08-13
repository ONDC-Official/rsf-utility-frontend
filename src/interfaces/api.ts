export interface IParams {
  url: string
  payload?: any
}

export interface IApiResponse<T> {
  success: boolean
  message: string
  data: T
  details: {
    error: string
  }
  pagination?: {
    totalCount: number
    page: number
    limit: number
    totalPages: number
  }
}
