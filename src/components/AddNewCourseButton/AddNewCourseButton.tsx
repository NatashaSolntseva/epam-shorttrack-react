import { Button } from '@mui/material';

export function AddNewCourseButton() {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{ px: 3, py: 1, whiteSpace: 'nowrap' }}
    >
      ADD NEW COURSE
    </Button>
  );
}
