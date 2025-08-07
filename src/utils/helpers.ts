export const buildApiUrl = (route: string, params: Record<string, string | number>) =>
  Object.keys(params).reduce((acc, key) => {
    const value = String(params[key])
    return acc.replace(`{${key}}`, value).replace(new RegExp(`:${key}\\b`, 'g'), value)
  }, route)
