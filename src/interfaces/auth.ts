export interface AuthContextType {
  token: string | null
  refreshToken: () => Promise<void>
}

export interface ISignTokenPayload {
  client_id: string
  expires: string
}

export interface ISignTokenResponse {
  token: string
  expires_at: string
}
