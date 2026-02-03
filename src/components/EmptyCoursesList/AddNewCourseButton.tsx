import { Button } from '@mui/material';

type Props = {
  onClick?: () => void;
};

export function AddNewCourseButton({ onClick }: Props) {
  return (
    <Button
      variant="contained"
      disableElevation
      onClick={onClick}
      sx={{ px: 4, py: 1.1 }}
    >
      ADD NEW COURSE
    </Button>
  );
}
