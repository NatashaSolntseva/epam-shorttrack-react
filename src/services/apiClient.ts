import axios from 'axios';

export const API_BASE_URL =
  'https://6989cfbbc04d974bc6a07aed.mockapi.io/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function toApiError(e: unknown): ApiError {
  if (axios.isAxiosError(e)) {
    const msg =
      e.response?.data &&
      typeof e.response.data === 'object' &&
      'message' in e.response.data
        ? String((e.response.data as { message?: unknown }).message)
        : e.message;

    return new ApiError(msg || 'Request failed', e.response?.status);
  }

  return new ApiError(e instanceof Error ? e.message : 'Request failed');
}
