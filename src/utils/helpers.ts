import { APIRoute } from '@constants/enum'

export const buildApiUrl = (route: APIRoute, params: Record<string, string | number>) =>
  Object.keys(params).reduce((acc, key) => acc.replace(`{${key}}`, String(params[key])), route)
