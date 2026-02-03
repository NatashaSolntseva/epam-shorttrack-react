import type { Course } from '../types/types';

export const COURSES_STORAGE_KEY = 'courses';

function isCourse(value: unknown): value is Course {
  if (!value || typeof value !== 'object') return false;

  const v = value as Record<string, unknown>;

  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    typeof v.description === 'string' &&
    typeof v.creationDate === 'string' &&
    typeof v.duration === 'number' &&
    Array.isArray(v.authors) &&
    v.authors.every((a) => typeof a === 'string')
  );
}

function parseCourses(raw: string | null): Course[] | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const valid = parsed.filter(isCourse);
    return valid;
  } catch {
    return null;
  }
}

export function readCourses(): Course[] | null {
  const raw = localStorage.getItem(COURSES_STORAGE_KEY);
  return parseCourses(raw);
}

export function writeCourses(courses: Course[]): void {
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
}

export function ensureCoursesInitialized(
  fallback: readonly Course[]
): Course[] {
  const stored = readCourses();
  if (stored) return stored;

  const next = [...fallback];
  writeCourses(next);
  return next;
}

export function deleteCourse(id: string): Course[] {
  const current = readCourses() ?? [];
  const next = current.filter((c) => c.id !== id);
  writeCourses(next);
  return next;
}

export function resetCoursesToMocks(fallback: readonly Course[]): Course[] {
  const next = [...fallback];
  writeCourses(next);
  return next;
}
