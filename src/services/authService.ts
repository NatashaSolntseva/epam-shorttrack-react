import {
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
  type AuthUser,
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

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;

  return (
    typeof v.id === 'number' &&
    typeof v.username === 'string' &&
    typeof v.email === 'string' &&
    typeof v.firstName === 'string' &&
    typeof v.lastName === 'string' &&
    typeof v.gender === 'string' &&
    typeof v.image === 'string'
  );
}

export function getUser(): AuthUser | null {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setUser(user: AuthUser): void {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(AUTH_USER_KEY);
}

export function clearAuth(): void {
  clearToken();
  clearUser();
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
  const user = data as LoginResponse;
  setUser({
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    image: user.image,
  });

  return data as LoginResponse;
}
