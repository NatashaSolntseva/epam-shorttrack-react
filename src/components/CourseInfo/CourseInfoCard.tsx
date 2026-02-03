import { Card, CardContent, Box, Divider } from '@mui/material';
import type { Course } from '../../types/types';
import { Description } from './Description';
import { Id } from './Id';
import { Duration } from './Duration';
import { CreationDate } from './CreationDate';
import { AuthorsList } from './AuthorsList';

type Props = {
  course: Course;
};

export function CourseInfoCard({ course }: Props) {
  return (
    <Card sx={{ borderRadius: 1.5, boxShadow: 3 }}>
      <CardContent
        sx={{
          p: 4,
          '&:last-child': { pb: 4 },
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 4,
          '@media (max-width:750px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        <Box>
          <Description description={course.description} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            '@media (max-width:750px)': { flexDirection: 'column' },
          }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{ '@media (max-width:750px)': { display: 'none' } }}
          />

          <Box sx={{ flex: 1 }}>
            <Id id={course.id} />
            <Duration duration={course.duration} />
            <CreationDate creationDate={course.creationDate} />
            <AuthorsList authors={course.authors} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
