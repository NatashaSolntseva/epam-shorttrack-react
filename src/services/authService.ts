import {
  AUTH_TOKEN_KEY,
  type LoginRequest,
  type LoginResponse,
} from '../types/auth.type';

export function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
      expiresInMins: payload.expiresInMins ?? 60,
    }),
  });

  const data: unknown = await res.json();

  if (!res.ok) {
    const message =
      typeof data === 'object' && data !== null && 'message' in data
        ? String((data as { message?: unknown }).message)
        : 'Login failed';
    throw new AuthError(message);
  }

  const parsed = data as Partial<LoginResponse>;
  if (!parsed.accessToken) {
    throw new AuthError('Login response does not contain accessToken');
  }

  setToken(parsed.accessToken);

  return data as LoginResponse;
}
