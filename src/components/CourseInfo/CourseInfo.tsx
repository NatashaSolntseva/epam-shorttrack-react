import { Box, Container } from '@mui/material';
import type { Course } from '../../types/types';
import { CourseInfoTitle } from './CourseInfoTitle';
import { CourseInfoCard } from './CourseInfoCard';
import { BackButton } from './BackButton';

type Props = {
  course: Course;
  onBack?: () => void;
};

export function CourseInfo({ course, onBack }: Props) {
  return (
    <Box sx={{ bgcolor: '#e9e9e9', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <CourseInfoTitle title={course.title} />

        <Box sx={{ mt: 3 }}>
          <CourseInfoCard course={course} />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <BackButton onClick={onBack} />
        </Box>
      </Container>
    </Box>
  );
}
