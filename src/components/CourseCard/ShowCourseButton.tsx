import { Button } from '@mui/material';

type Props = { onClick?: () => void };

export function ShowCourseButton({ onClick }: Props) {
  return (
    <Button
      variant="contained"
      disableElevation
      onClick={onClick}
      sx={{
        px: 3,
        py: 1,
        '@media (max-width:750px)': { flex: 1 },
      }}
    >
      SHOW COURSE
    </Button>
  );
}
