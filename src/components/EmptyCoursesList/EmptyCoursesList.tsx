import { Box } from '@mui/material';
import { Title } from './Title';
import { Subtitle } from './Subtitle';
import { AddNewCourseButton } from './AddNewCourseButton';

type Props = {
  onAdd?: () => void;
};

export function EmptyCoursesList({ onAdd }: Props) {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box>
        <Title />
        <Subtitle />
        <Box sx={{ mt: 3 }}>
          <AddNewCourseButton onClick={onAdd} />
        </Box>
      </Box>
    </Box>
  );
}
