export interface UserResponse {
  id: number;
  email: string;
  name: string;
  balance: number;
}

export interface LogoutResponse {
  message: string;
}

export interface DecodeResponse {
  userId: string;
}
