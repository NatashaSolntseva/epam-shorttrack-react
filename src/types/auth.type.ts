export const AUTH_TOKEN_KEY = 'auth_token';
export const AUTH_USER_KEY = 'auth_user';

export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = Omit<LoginResponse, 'accessToken' | 'refreshToken'>;
