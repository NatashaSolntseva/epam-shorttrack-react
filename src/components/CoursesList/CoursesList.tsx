import { Container } from '@mui/material';
import { CourseCard } from '../CourseCard/CourseCard';
import type { Course } from '../../types/types';

type Author = {
  id: string;
  name: string;
};

type Props = {
  courses: readonly Course[];
  authors: readonly Author[];
};

export function CoursesList({ courses, authors }: Props) {
  const authorsById = Object.fromEntries(
    authors.map((a) => [a.id, a.name] as const)
  );

  const coursesWithAuthorNames: Course[] = courses.map((course) => ({
    ...course,
    authors: course.authors.map((id) => authorsById[id] ?? 'Unknown author'),
  }));

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {coursesWithAuthorNames.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onShow={(id) => console.log('show', id)}
          onDelete={(id) => console.log('delete', id)}
          onEdit={(id) => console.log('edit', id)}
        />
      ))}
    </Container>
  );
}
