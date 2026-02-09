import type { Author, Course } from '../types/types';
import { api, toApiError } from './apiClient';

export async function fetchAuthors(): Promise<Author[]> {
  try {
    const { data } = await api.get<Author[]>('/authors');
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}

export async function fetchCourses(): Promise<Course[]> {
  try {
    const { data } = await api.get<Course[]>('/courses');
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}

export async function fetchCourseById(id: string): Promise<Course> {
  try {
    const { data } = await api.get<Course>(
      `/courses/${encodeURIComponent(id)}`
    );
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}

export type CreateCoursePayload = Omit<Course, 'id'>;

export async function createCourse(
  payload: CreateCoursePayload
): Promise<Course> {
  try {
    const { data } = await api.post<Course>('/courses', payload);
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}

export type UpdateCoursePayload = Omit<Course, 'id'>;

export async function updateCourse(
  id: string,
  payload: UpdateCoursePayload
): Promise<Course> {
  try {
    const { data } = await api.put<Course>(
      `/courses/${encodeURIComponent(id)}`,
      payload
    );
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}

export async function deleteCourseById(id: string): Promise<void> {
  try {
    await api.delete(`/courses/${encodeURIComponent(id)}`);
  } catch (e) {
    throw toApiError(e);
  }
}

export type CreateAuthorPayload = Omit<Author, 'id'>;

export async function createAuthor(
  payload: CreateAuthorPayload
): Promise<Author> {
  try {
    const { data } = await api.post<Author>('/authors', payload);
    return data;
  } catch (e) {
    throw toApiError(e);
  }
}

export async function deleteAuthorById(id: string): Promise<void> {
  try {
    await api.delete(`/authors/${encodeURIComponent(id)}`);
  } catch (e) {
    throw toApiError(e);
  }
}
