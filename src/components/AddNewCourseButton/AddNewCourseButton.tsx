import { Button } from '@mui/material';

type Props = { onClick?: () => void };

export function AddNewCourseButton({ onClick }: Props) {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{ px: 3, py: 1, whiteSpace: 'nowrap' }}
      onClick={onClick}
    >
      ADD NEW COURSE
    </Button>
  );
}
