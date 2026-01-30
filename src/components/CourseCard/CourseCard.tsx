import { Card, CardContent, Box, Divider } from '@mui/material';
import type { Course } from '../../types/types';

import { Title } from './Title';
import { Description } from './Description';
import { AuthorsList } from './AuthorsList';
import { Duration } from './Duration';
import { CreationDate } from './CreationDate';
import { ShowCourseButton } from './ShowCourseButton';
import { DeleteCourseButton } from './DeleteCourseButton';
import { EditCourseButton } from './EditCourseButton';

type Props = {
  course: Course;
  onShow?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};

export function CourseCard({ course, onShow, onDelete, onEdit }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 1.5,
        boxShadow: 3,
        borderLeft: '5px solid',
        borderLeftColor: 'primary.main',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'stretch',
          p: 3,
          '&:last-child': { pb: 3 },
          '@media (max-width:750px)': { flexDirection: 'column' },
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Title title={course.title} />
          <Description description={course.description} />
        </Box>
        <Box
          sx={{
            width: 360,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            '@media (max-width:750px)': { width: '100%' },
          }}
        >
          <Box>
            <AuthorsList authors={course.authors} />
            <Duration duration={course.duration} />
            <CreationDate creationDate={course.creationDate} />
          </Box>

          <Divider sx={{ '@media (min-width:751px)': { display: 'none' } }} />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1.5,
              '@media (max-width:750px)': { justifyContent: 'stretch' },
            }}
          >
            <ShowCourseButton onClick={() => onShow?.(course.id)} />
            <DeleteCourseButton onClick={() => onDelete?.(course.id)} />
            <EditCourseButton onClick={() => onEdit?.(course.id)} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
